import { useEffect, useRef } from 'react'
import { SickListProps } from "../types/sick";
import { ReactComponent as SearchIc } from "../assets/search.svg";

type SearchListProps = {
  searchList: SickListProps[];
  currentIdx: number;
  handleCurrentIdxUpdate: (idx: number) => void;
};

const SearchBox = ({ searchList, currentIdx, handleCurrentIdxUpdate }: SearchListProps) => {

  return (
    <div className="py-5 bg-white drop-shadow-lg rounded-3xl text-lg">
      <ul>
        {searchList.length > 0 ? (
          <div className="text-gray-500 px-5 text-sm">추천 검색어</div>
        ) : (
          <div className="text-gray-500 px-5 text-sm">검색어 없음</div>
        )}
        {searchList.map(({ sickCd, sickNm }, idx) => (
          <div className="flex hover:bg-[#F8F9FA] px-5 py-2">
            <SearchIc className="w-5 mr-2" />
            <li key={sickCd} className="">
              {sickNm}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;