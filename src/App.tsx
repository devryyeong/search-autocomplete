import './index.css';
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <div className="p-20">
      <div className="text-lg text-center">
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </div>
      <br />
      <SearchPage />
    </div>
  );
}

export default App
