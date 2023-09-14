import SearchBox from "../components/SearchBox";
import SearchInput from "../components/SearchInput";

export const SearchPage = () => {
  return (
    <div className="p-20">
      <div className="text-lg text-center">
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </div>
      <br />
      <SearchInput />
      <SearchBox />
    </div>
  );
}
