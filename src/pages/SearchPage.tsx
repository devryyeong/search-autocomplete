import SearchInput from "../components/SearchInput";

export const SearchPage = () => {
  return (
    <div className="h-full p-20 bg-[#CAE9FF]">
      <div className="text-4xl text-center font-bold leading-relaxed">
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </div>
      <br />
      <SearchInput />
    </div>
  );
}
