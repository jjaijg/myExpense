export const searchByPurpose = (arr, searchKey) => {
  searchKey = searchKey.toLowerCase().trim();
  if (!searchKey) return [];
  return arr.filter(trans =>
    trans.doneFor
      .toLowerCase()
      .trim()
      .includes(searchKey)
  );
};
export const searchBymonthAndYear = (arr, month, year) => {
  if (!month || !year) return [];
  return arr.filter(trans => {
    const { doneAt } = trans;
    const transMonth = doneAt.getMonth();
    const transYear = doneAt.getFullYear();
    return transMonth === month && transYear === year;
  });
};
