// 展示行数解析规则
const reg = /^-(\d+)\+(\d+)$/;
// 默认展示 10 行
export const defaultRows: displayRows = {
    upward: 5,
    downward: 5,
};

/**
 * 解析展示规则
 * 
 * + 数字 `-1`，全部展示
 * + 字符串 `-6+4`，展示指定行前 6 行、后 4 行
 * + 对象 `{ upward, downward }`，展示指定行前 `upward` 行、后 `downward` 行
 * 
 * @param {string|object} displayRows 展示规则
 */
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
