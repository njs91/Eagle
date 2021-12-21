import { formatDate, formatTime, capitalise, removeItemFromArray, updateArray } from './HelperFunctions';

test('Format date', () => {
    expect(formatDate('2021-12-15T11:06:04.487309+00:00')).toBe('15/12/2021');
});
test('Format time', () => {
    expect(formatTime('2021-12-18T22:19:01.294344Z')).toBe('22:19');
});
test('Capitalise', () => {
    expect(capitalise('capitalised')).toBe('Capitalised');
    expect(capitalise('capitalised sentance')).toBe('Capitalised sentance');
    expect(capitalise('CAPITALISE')).toBe('Capitalise');
});
test('Remove item from array', () => {
    expect(
        removeItemFromArray(2, [
            { key: 'value', id: 1 },
            { key: 'value', id: 2 },
            { key: 'value', id: 3 },
        ])
    ).toEqual([
        { key: 'value', id: 1 },
        { key: 'value', id: 3 },
    ]);
});
test('Update array', () => {
    expect(
        updateArray(
            [
                { key: 'value', id: 1 },
                { key: 'value', id: 2 },
                { key: 'value', id: 3 },
            ],
            2,
            { key: 'value', id: 4 }
        )
    ).toEqual([
        { key: 'value', id: 4 },
        { key: 'value', id: 1 },
        { key: 'value', id: 3 },
    ]);
});
