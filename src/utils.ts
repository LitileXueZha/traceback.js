export function parseRows(displayRows: string) {
    const reg = /(\+|-)\d+/g;
    // 默认展示 10 行
    const defaultRows = {
        start: 5,
        end: 5,
    };
    const arrRows = displayRows.match(reg);

    if (!arrRows) return defaultRows;

    const arrNumRows = arrRows.filter((num) => !isNaN(+num));

    if (arrNumRows.length === 0) return defaultRows;
    if (arrRows.length === 1) {
        const row = arrRows[0];


    }
}
