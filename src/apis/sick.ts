import axios from "axios";
import cache from "../components/utils/cache";
import { SickListProps } from "../types/sick";

const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

const searchServices = {
  get() {
    instance.interceptors.response.use(
      async res => {
        const { url = '' } = res.config;

        await cache.set(url, res.data);
        return res;
      },
      err => {
        return Promise.reject(err);
      },
    );

    return instance;
  },
};

export const getSicks = {
  async get(query: string | number) {
    const url = `/sick?q=${query}`;
    const res = await cache.get(url);

    if (res) {
      const { data, expirationTime } = await res.json();
      if (Date.now() < expirationTime) return data as SickListProps[];
    }

    const { data } = await searchServices.get().get<SickListProps[]>(url);
    console.info('calling api');

    return data;
  },
};