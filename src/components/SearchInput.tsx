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
      <div className="flex w-full flex-wrap bg-white p-5 rounded-full items-center drop-shadow-lg">
        <input
          className="flex-auto text-lg outline-none "
          ref={ref}
          placeholder={isShow ? "" : "질환명을 입력해주세요"}
          type="text"
          value={search}
          onChange={handleSearchChange}
          onClick={handleOpen}
          onFocus={handleOpen}
          onKeyDown={handleSearchKeyDown}
        />
        <button className="bg-[#017BE8] rounded-full mx-4 w-12 h-12 flex justify-center items-center">
          <SearchIc />
        </button>
      </div>
      {isShow && (
        <SearchBox
          searchList={searchList}
          currentIdx={currentIdx}
          handleCurrentIdxUpdate={handleCurrentIdxUpdate}
        />
      )}
    </form>
  );
};

export default SearchInput;
