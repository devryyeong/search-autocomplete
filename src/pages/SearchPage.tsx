import React, { useState, useEffect, useRef } from 'react'
import { ReactComponent as SearchIc } from "../assets/search.svg";
import SearchBox from "../components/SearchBox";
import { useDebounce } from "../hooks/useDebounce";

interface SearchResult {
  sickCd?: string;
  sickNm?: string;
}

export const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const cacheKey = `sick_${query}`;

  const handleInputChange = useDebounce((e: React.FormEvent<HTMLInputElement>) => {
    // setQuery(e.currentTarget.value);
    const value = e.target.value.trim();
    if (value === '') {
      setVisible(false);
    } else {
      fetchData(query)
    }
  }, 1000);

  const handleInputClick = () => {
    setVisible(!visible);
  };

  const handleSearchClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      fetchData()
      .then(() => console.log("A"))
      .catch(err => console.log(err));
      
    } catch {
      throw new Error("ERROR");
    }
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
      {visible && <SearchBox visible={visible} setVisible={setVisible} />}
    </div>
  );
}
