import stylesheet from './index.css';

const VERSION = '1.0.0';
const DEFAULT_OPTS: TracebackOption = {
    start: 1,
    separator: '\n',
    highlightRow: 14,
};

/** 样式集合 */
const classNames = {
    /** 列表容器 */
    container: 'traceback-js_container',
    /** 列表项 */
    item: 'traceback-js_item',
    /** 列表高亮项 */
    highlightRow: 'traceback-js_item highlight_row',
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
        const $style = document.createElement('style');
        const { separator, start, highlightRow } = opts;
        console.time('tracebackjs');

        const rawList = rawInput.split(separator);

        rawList.forEach((raw, index) => {
            if (index < start - 1) return;

            let className = classNames.item;
            const $index = document.createElement('div');
            const $content = document.createElement('div');
            const $li = document.createElement('div');

            if (index === highlightRow - 1) {
                className = classNames.highlightRow;
            }

            $index.id = `L${index + 1}`;
            $index.dataset.lineno = String(index + 1);
            $index.className = classNames.index;
            $li.className = className;
            $content.className = classNames.content;
            $content.textContent = raw;
            $li.appendChild($index);
            $li.appendChild($content);
            $container.appendChild($li);
        });
        
        $container.className = classNames.container;
        $rootEl.appendChild($container);
        $style.textContent = stylesheet.replace(/\n\s*/gm, '');
        $rootEl.appendChild($style);
        $container.addEventListener('click', (e) => {
            console.log(e.target);
        });
        console.timeEnd('tracebackjs')
    };
}
console.log(DEFAULT_OPTS)

export default {
    version: VERSION,
    init,
};
