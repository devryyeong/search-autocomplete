import { useEffect, useRef } from 'react'
import { SickListProps } from "../types/sick";

type SearchListProps = {
  searchList: SickListProps[];
  currentIdx: number;
  handleCurrentIdxUpdate: (idx: number) => void;
};

const SearchBox = ({ searchList, currentIdx, handleCurrentIdxUpdate }: SearchListProps) => {

  return (
    <div>
      {searchList.length > 0 ? <div>추천 검색어</div> : <div>검색어 없음</div>}
      <ul className="p-1 rounded-md border-solid border-2 border-gray-700 text-sm text-gray-600 divide-y divide-slate-300">
        {searchList.map(({ sickCd, sickNm }, idx) => (
          <li key={sickCd} className="hover:bg-[#F8F9FA]">
            {sickNm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox