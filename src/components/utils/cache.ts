const cache = (() => {
  const EXPIRATION_TIME = 60 * 60 * 1000; // 1H
  let cacheStorage: Cache | undefined;
  
  const getCacheStorage = async () => {
    if (cacheStorage === undefined) cacheStorage = await caches.open('searchCache');
    return cacheStorage;
  };

  return {
    async set(url: string, data: unknown) {
      const cacheStorage = await getCacheStorage();
      const response = new Response(JSON.stringify({ data, expirationTime: Date.now() + EXPIRATION_TIME}))

      await cacheStorage.put(url, response);
    },
    async get(url: string, data: unknown) {
      const cacheStorage = await getCacheStorage();
      const response = await cacheStorage.match(url);

      return response;
    },
  };
})();

export default cache;