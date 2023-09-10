import React, { useState, useEffect, useRef } from 'react'
import { ReactComponent as SearchIc } from "../assets/search.svg";
import SearchBox from "../components/SearchBox";
import { useDebounce } from "../hooks/useDebounce";
import { getSicks } from "../apis/sick";

export interface SearchResult {
  sickCd: string;
  sickNm: string;
}

export const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const cacheKey = `sick_${query}`;

  // 비동기 함수로 검색 결과를 가져오고 캐시에 저장
  const fetchSearchResults = async (value: string) => {
    const cache = await caches.open(cacheKey);
    const cachedResponse = await cache.match(value);

    if (cachedResponse) {
      const dataWithExpiration = await cachedResponse.json();
      const { value: data, expiration } = dataWithExpiration;

      if (Date.now() < expiration) {
        // 만료되지 않았으면 캐시된 데이터 사용
        setSearchResults(data);
        return;
      } else {
        // 만료되었다면 캐시에서 제거
        await cache.delete(value);
      }
    }

    // 서버에서 새로운 데이터를 가져와 캐시에 저장
    const cacheExpireTime = 5 * 60 * 1000; // 5 minute

    try {
      const data = await getSicks(value);
      setSearchResults(data);

      const expiration = Date.now() + cacheExpireTime;
      const dataWithExpiration = {
        value: data,
        expiration,
      };
      const response = new Response(JSON.stringify(dataWithExpiration), {
        headers: { 'Cache-Control': `max-age=${cacheExpireTime / 1000}` },
      });
      cache.put(value, response); // 캐시에 결과 저장
    } catch (error) {
      console.log('Error while fetching search results: ', error);
      // 검색 결과 초기화
      setSearchResults([]);
    }
  };


  const handleInputChange = useDebounce((e: React.FormEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      setSearchResults([]);
      setVisible(false);
    } else {
      fetchSearchResults(value);
      setVisible(true);
    }
  }, 1000);

  const handleInputClick = () => {
    setVisible(!visible);
  };

  const handleSearchClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(query);
    setQuery('');
  };

  return (
    <div>
      <form>
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="검색어를 입력하세요"
            type="text"
            value={query}
            onChange={handleInputChange}
            onClick={handleInputClick}
          ></input>
          <button
            className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            onClick={handleSearchClick}
          >
            <SearchIc />
          </button>
        </div>
      </form>
      {visible && (
        <SearchBox
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}
