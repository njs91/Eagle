export const formatDate = (date: string): string => {
  const actualDate = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    actualDate
  );
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
    actualDate
  );
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
    actualDate
  );

  return `${day}/${month}/${year}`;
};

// @todo: create type that makes function invalid if the arr passed into it doesn't have a {id} key (that's also a number)
export const removeFromArray = (id: number, arr: Array<any>): Array<any> => {
  const indexToRemove: number = arr.map((el) => el.id).indexOf(id);
  ~indexToRemove && arr.splice(indexToRemove, 1); // ~ = >= 0
  return arr;
};
