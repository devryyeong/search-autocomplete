import { useState, useEffect } from 'react'
import { ReactComponent as SearchIc } from "../assets/search.svg";
import SearchBox from "../components/SearchBox";

interface SearchResult {
  sickCd?: string;
  sickNm?: string;
}

export const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const cacheKey = `sick_${query}`;

  const fetchData = async (): Promise<SearchResult> => {
    const apiUrl = `http://localhost:4000/sick?q=${query}`;
    const response = await fetch(apiUrl);
    return response.json();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleInputClick = () => {
    setVisible(!visible);
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
          <button className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0">
            <SearchIc />
          </button>
        </div>
      </form>
      {visible && <SearchBox visible={visible} setVisible={setVisible} />}
    </div>
  );
}
