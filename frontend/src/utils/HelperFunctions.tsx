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
