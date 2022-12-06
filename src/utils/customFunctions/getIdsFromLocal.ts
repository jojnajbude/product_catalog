export const getIdsFromLocal = (key: string) => {
  const ids = localStorage.getItem(key);

  return ids || '';
};