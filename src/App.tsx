import { useState, useEffect } from "react";
import './index.css';
import { ReactComponent as SearchIc } from "./assets/search.svg";

interface SearchResult {
  sickCd?: string,
  sickNm?: string
}

// localStorage에 키를 설정하고 만료 시간을 함께 저장할 수 있는 함수
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// localStorage에서 항목을 검색하는동안 만료시간을 확인할 수 있음
const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.stringify(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function useCachedData<T>(
  cacheKey: string,
  fetchData: () => Promise<T>
): T | undefined {
  const [cachedData, setCachedData] = useState<T>();

  useEffect(() => {
    const fetchDataAndCache = async () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        console.log("로컬 캐시에서 데이터를 가져옵니다.");
        setCachedData(JSON.parse(cachedData));
        return;
      }

      try {
        const data = await fetchData();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        console.log("API에서 데이터를 가져옵니다.");
        setCachedData(data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchDataAndCache();
  }, []);

  return cachedData;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const cacheKey = `sick_${query}`;

  const fetchData = async (): Promise<SearchResult> => {
    const apiUrl = `http://localhost:4000/sick?q=${query}`;
    const response = await fetch(apiUrl);
    return response.json();
  };

  const suggestions = useCachedData<SearchResult>(cacheKey, fetchData)?.suggestions || [];
  
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  
  useEffect(() => {
    console.log("suggestions:" + suggestions);
  }, [])
  

  return (
    <div className="p-4">
      <div className="text-lg text-center">
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </div>
      <br />
      <form>
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="검색어를 입력하세요"
            type="text"
            value={query}
            onChange={handleInputChange}
          ></input>
          <button className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0">
            <SearchIc/>
          </button>
        </div>
      </form>
        <ul className="p-1 rounded-md border-solid border-2 border-gray-700 text-sm text-gray-600 divide-y divide-slate-300">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
          <li>aaa</li>
          <li>ggg</li>
          <li>jjj</li>
        </ul>
    </div>
  );
}

export default App
/**
 * 검색어 자동완성 기능을 만들어보자
 * 캐싱이 언제, 왜 필요하지
 * 입력마다 api를 호출하지 않으려면 api 요청을 언제 보내야하지
 * 
 */
