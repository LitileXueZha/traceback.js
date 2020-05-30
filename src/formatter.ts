/**
 * 格式化源文本
 * 
 * 建立一个 layer（层）的概念，
 * 渲染时根据 layer 而不是逻辑混写到渲染时
 * 
 * @param {string} rawInput 源文本
 * @param {TracebackOption} opts 配置对象
 * @returns {Row[]} 格式化行数组
 */
export default function formatter(rawInput: string, opts: TracebackOption): Row[] {
    const {
        separator, highlightRow, displayRows, start,
    } = opts;
    // @ts-ignore
    const { upward, downward } = displayRows;
    const formatRows: Row[] = [];
    const rawList = serialize(rawInput, separator);

    if (highlightRow - start > rawList.length) {
        console.warn('traceback.js渲染异常：高亮行数超出源文本行数');
        return [];
    }

    rawList.forEach((raw, index) => {
        const lineno = index + start;

        // 剔除展示规则外的行数
        if (upward !== -1 && lineno < highlightRow - upward) return;
        if (downward !== -1 && lineno > highlightRow + downward) return;

        const row = factory(lineno, raw, index === highlightRow - start);

        formatRows.push(row);
    });

    return formatRows;
}

/**
 * 解析文本
 * 
 * @param rawInput 源文本
 * @param separator 分隔符
 */
function serialize(rawInput: string, separator: string): string[] {
    // TODO: 只是简单地分割，考虑处理大量文本时性能？比如 10w+ 行
    return rawInput.trim().split(separator);
}

/** 创建格式化行对象 */
function factory(lineno: number, content: string, highlighted?: boolean): Row {
    const o: Row = {
        lineno,
        content,
    };

    if (highlighted) o.highlighted = true;

    return o;
}
