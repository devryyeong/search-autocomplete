import axios from "axios";

export const getSicks = async (query: string |number) => {
  const apiUrl = `http://localhost:4000/sick?q=${query}`;
  const response = await axios(apiUrl);
  console.log("response: ", response);
  return response.data;
};