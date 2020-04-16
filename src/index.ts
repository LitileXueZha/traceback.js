import stylesheet from './index.css';
import { parseRows } from './utils';

const VERSION = '0.0.1';
const DEFAULT_OPTS: TracebackOption = {
    start: 1,
    separator: '\n',
    highlightRow: 1,
    displayRows: '-5+5',
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
        console.warn(`查询${selectors}失败，请确保页面上存在此元素`);
        return () => {};
    }
    
    return function render(rawInput: string) {
        const $container = document.createElement('div');
        const $table = document.createElement('table');
        const $tbody = document.createElement('tbody');
        const $style = document.createElement('style');
        const options = Object.assign({}, DEFAULT_OPTS, opts);
        const { separator, highlightRow, displayRows, start } = options;

        const rawList = rawInput.trim().split(separator);

        if (highlightRow > rawList.length) {
            console.warn('traceback.js渲染异常：高亮行数超出源代码行数');
            return;
        }
        const { upward, downward } = parseRows(displayRows);

        rawList.forEach((raw, index) => {
            if (upward !== -1 && index + start < highlightRow - upward) return;
            if (downward !== -1 && index + start > highlightRow + downward) return;

            let className = classNames.item;
            const $index = document.createElement('td');
            const $content = document.createElement('td');
            const $tr = document.createElement('tr');

            if (index === highlightRow - start) {
                className = classNames.highlightRow;
            }

            // $index.id = `L${index + 1}`;
            // @ts-ignore
            $index.dataset.lineno = index + start;
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
    };
}

export default {
    version: VERSION,
    init,
};
