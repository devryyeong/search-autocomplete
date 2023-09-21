import React, { useEffect, useState } from 'react'
import useDebounce from "./useDebounce";
import { getSicks } from "../apis/sick";
import { SickProps } from "../types/sick";

const limitResult = (list: SickProps[], num: number) => list.slice(0, num);

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<SickProps[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const debounceSearch = useDebounce(search);

  const handleCurrentIdxUpdate = (idx: number) => setCurrentIdx(idx);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearchReset = () => setSearch('');
  const handleOpen = () => setIsShow(true);
  const handleClose = () => setIsShow(false);

  const handleSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // console.log('e: e');
    // console.log('e.key: ', e.key);
    const searchKeyUpDown: { [index: string]: () => void } = {
      ArrowUp() {
        e.preventDefault();
        setCurrentIdx(prev => prev >= 0 ? prev - 1 : prev);
      },
      ArrowDown() {
        e.preventDefault();
        setCurrentIdx(prev => prev < searchList.length - 1 ? prev + 1 : prev);
      },
    };
    searchKeyUpDown[e.key];
  };

  useEffect(() => {
    void (async () => {
      try {
        const newSearchList = await getSicks.get(debounceSearch);
        setSearchList(limitResult(newSearchList, 6));
      } catch (error) {
        console.log(error);
      } finally {
        handleCurrentIdxUpdate(-1);
      }
    })();
  }, [debounceSearch, handleCurrentIdxUpdate]);

  return {
    search,
    searchList,
    isShow,
    currentIdx,
    handleCurrentIdxUpdate,
    handleSearchChange,
    handleSearchReset,
    handleOpen,
    handleClose,
    handleSearchKeyDown,
  };
  
}

export default useSearch;