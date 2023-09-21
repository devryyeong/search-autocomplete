import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIc } from "../assets/search.svg";
import useSearch from "../hooks/useSearch";
import useOnclickOutside from "../hooks/useOnclickOutside";
import SearchBox from "./SearchBox";

const SearchInput = () => {
  const {
    search,
    searchList,
    isShow,
    currentIdx,
    handleSearchChange,
    handleSearchReset,
    handleOpen,
    handleClose,
    handleSearchKeyDown,
    handleCurrentIdxUpdate,
  } = useSearch();

  const ref = useOnclickOutside(handleClose);

  return (
    <form>
      <div className="relative flex w-full flex-wrap items-stretch" ref={ref}>
        <input
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder={isShow ? '' : '질환명을 입력해주세요'}
          type="text"
          value={search}
          onChange={handleSearchChange}
          onClick={handleOpen}
          onFocus={handleOpen}
          onKeyDown={handleSearchKeyDown}
        ></input>
        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
        >
          <SearchIc />
        </button>
      </div>
      {isShow && <SearchBox searchList={searchList} currentIdx={currentIdx} handleCurrentIdxUpdate={handleCurrentIdxUpdate} /> }
    </form>
  );
};

export default SearchInput;
