import stylesheet from './index.css';

const VERSION = '1.0.0';
const DEFAULT_OPTS: TracebackOption = {
    start: 1,
    separator: '\n',
    highlightRow: 10,
};

/** 样式集合 */
const classNames = {
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
 * 
 * @param selectors DOM 选择符，同 `querySelector`
 * @param opts 配置对象
 */
function init(selectors: string, opts: TracebackOption = DEFAULT_OPTS) {
    const $rootEl = document.querySelector(selectors);

    if ($rootEl === null) {
        throw new ReferenceError(`查询${selectors}失败，请确保页面上存在此元素`);
    }
    
    return (rawInput: string) => {
        const $container = document.createElement('div');
        const $table = document.createElement('table');
        const $tbody = document.createElement('tbody');
        const $style = document.createElement('style');
        const { separator, start, highlightRow } = opts;
        console.time('tracebackjs');

        const rawList = rawInput.split(separator).slice(0,200);

        rawList.forEach((raw, index) => {
            if (index < start - 1) return;

            let className = classNames.item;
            const $index = document.createElement('td');
            const $content = document.createElement('td');
            const $tr = document.createElement('tr');

            if (index === highlightRow - 1) {
                className = classNames.highlightRow;
            }

            // $index.id = `L${index + 1}`;
            // @ts-ignore
            $index.dataset.lineno = index + 1;
            $content.textContent = raw;
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
        $rootEl.appendChild($container);
        $style.textContent = stylesheet;
        $rootEl.appendChild($style);

        let $rowClicked: HTMLElement | null = null;

        $table.addEventListener('click', (e) => {
            // @ts-ignore
            const { className, parentNode } = e.target;

            if (className === classNames.index && parentNode !== $rowClicked) {
                $rowClicked?.classList.remove(classNames.clickedRow);
                parentNode.classList.add(classNames.clickedRow);
                $rowClicked = parentNode;
            }
        });
        console.timeEnd('tracebackjs')
    };
}
console.log(DEFAULT_OPTS)

export default {
    version: VERSION,
    init,
};
