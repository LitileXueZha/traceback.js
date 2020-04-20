// 展示行数解析规则
const reg = /^-(\d+)\+(\d+)$/;
// 默认展示 10 行
export const defaultRows: displayRows = {
    upward: 5,
    downward: 5,
};

export function parseRows(displayRows: TracebackOption['displayRows']): displayRows {
    let row = {};

    // 全部显示
    if (displayRows === -1) {
        row = {
            upward: -1,
            downward: -1,
        };
    } else if (typeof displayRows === 'object') {
        row = displayRows;
    } else if (typeof displayRows === 'string' && reg.test(displayRows)) {
        // @ts-ignore
        const [, upward, downward] = displayRows.match(reg);

        row = {
            upward: +upward,
            downward: +downward,
        };
    }

    // eslint-disable-next-line prefer-object-spread
    return Object.assign({}, defaultRows, row);
}
