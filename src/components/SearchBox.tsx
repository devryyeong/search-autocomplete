import React from 'react'

interface SearchBoxProps {
  visible: boolean;
  closeBox: void;
}

const SearchBox = () => {
  return (
    <ul className="p-1 rounded-md border-solid border-2 border-gray-700 text-sm text-gray-600 divide-y divide-slate-300">
      <li>bbb</li>
      <li>ggg</li>
      <li>jjj</li>
    </ul>
  );
}

export default SearchBox