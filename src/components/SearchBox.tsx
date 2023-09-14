import { useEffect, useRef } from 'react'

const SearchBox = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        //
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [searchBoxRef]);

  return (
    <div ref={searchBoxRef}>
      <ul className="p-1 rounded-md border-solid border-2 border-gray-700 text-sm text-gray-600 divide-y divide-slate-300">
        <li>bbb</li>
        <li>ggg</li>
        <li>jjj</li>
      </ul>
    </div>
  );
};

export default SearchBox