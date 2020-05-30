import stylesheet from './index.css';

/** 样式集合 */
export const classNames = {
    /** 容器 */
    container: 'traceback-js_container',
    /** 列表 */
    list: 'traceback-js_list',
    /** 列表项 */
    item: 'traceback-js_item',
    /** 列表高亮项 */
    highlightRow: 'traceback-js_item highlight_row',
    /** 列表点击项 */
    clickedRow: 'clicked_row',
    /** 列表项索引 */
    index: 'traceback-js_index',
    /** 列表项内容 */
    content: 'traceback-js_content',
};

/**
 * 渲染源文本
 * 
 * 将格式化后的行渲染成 html，目前使用 `table`
 * 
 * @param {Row[]} formatRows 格式化行数组
 * @returns {null|HTMLElement} dom 对象；数组为空时返回 `null`
 */
export default function renderer(formatRows: Row[]): HTMLElement | null {
    if (formatRows.length === 0) {
        return null;
    }

    const $container = document.createElement('div');
    // 使用 table 渲染
    const $table = document.createElement('table');
    const $tbody = document.createElement('tbody');

    formatRows.forEach((row) => {
        const $tr = document.createElement('tr');
        const $index = document.createElement('td');
        const $content = document.createElement('td');
        let className = classNames.item;

        // 高亮行 class 名称修改
        if (row.highlighted) {
            className = classNames.highlightRow;
        }

        // $index.id = `L${index + 1}`;
        // @ts-ignore
        $index.dataset.lineno = row.lineno;
        $content.textContent = row.content;
        $index.className = classNames.index;
        $content.className = classNames.content;
        $tr.className = className;
        $tr.appendChild($index);
        $tr.appendChild($content);
        $tbody.appendChild($tr);
    });

    $table.className = classNames.list;
    $container.className = classNames.container;
    $table.appendChild($tbody);
    $container.appendChild($table);

    // 添加样式
    const $style = document.createElement('style');

    $style.textContent = stylesheet;
    $container.appendChild($style);

    return $container;
}
