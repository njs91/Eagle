export const formatDate = (date: string): string => {
    const actualDate = new Date(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(actualDate);
    const month = new Intl.DateTimeFormat('en', {
        month: '2-digit',
    }).format(actualDate);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(actualDate);

    return `${day}/${month}/${year}`;
};

export const formatTime = (date: string): string => {
    const actualDate = new Date(date);
    const hour = new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        hour12: false,
    }).format(actualDate);
    const minute = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(actualDate);

    return `${hour}:${minute}`;
};

export const removeItemFromArray = (id: number, arr: Array<{ id: number }>): Array<{}> => {
    const indexToRemove: number = arr.map((el) => el.id).indexOf(id);
    ~indexToRemove && arr.splice(indexToRemove, 1); // ~ = >= 0
    return arr;
};

export const updateArray = (arr: Array<{ id: number }>, id: number, newEl: { id: number }): Array<{}> => {
    const indexToReplace: number = arr.map((el) => el.id).indexOf(id);
    ~indexToReplace && arr.splice(indexToReplace, 1);
    arr.unshift(newEl); // add to front of array so it shows latest edited item
    return arr;
};

export const capitalise = (str: string): string => {
    if (!str.length) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
