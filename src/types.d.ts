/** 初始化配置对象 */
declare type TracebackOption = {
    /** 起始行号 */
    start: number,
    /** 分隔符 */
    separator: string,
    /** 高亮位置 */
    highlightRow: number,
    /** 展示行数 */
    displayRows: -1 | string | displayRows,
};

/** 展示行数选项 */
declare type displayRows = {
    /** 向上展示行数 */
    upward: number,
    /** 向下展示行数 */
    downward: number,
};

declare module '*.css';
