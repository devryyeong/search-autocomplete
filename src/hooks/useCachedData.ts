import { useEffect, useState } from "react";

export default function useCachedData<T>(
  cacheKey: string,
  fetchData: () => Promise<T>
): T | undefined {
  const [cachedData, setCachedData] = useState<T>();

  useEffect(() => {
    const fetchDataAndCache = async () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        console.log("로컬 캐시에서 데이터를 가져옵니다.");
        setCachedData(JSON.parse(cachedData));
        return;
      }

      try {
        const data = await fetchData();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        console.log("API에서 데이터를 가져옵니다.", cachedData);
        setCachedData(data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchDataAndCache();
  }, []);

  return cachedData;
}
