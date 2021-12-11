export const formatDate = (date: string): string => {
    const actualDate = new Date(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(actualDate);
    const month = new Intl.DateTimeFormat('en', {
        month: '2-digit',
    }).format(actualDate);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(actualDate);

    return `${day}/${month}/${year}`;
};

export const removeItemFromArray = (id: number, arr: Array<{ id: number }>): Array<{}> => {
    const indexToRemove: number = arr.map((el) => el.id).indexOf(id);
    ~indexToRemove && arr.splice(indexToRemove, 1); // ~ = >= 0
    return arr;
};

export const capitalise = (str: string): string => {
    if (!str.length) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
