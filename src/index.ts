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
};


/**
 * 
 * @param selectors DOM 选择符，同 `querySelector`
 * @param opts 配置对象
 */
function init(selectors: string, opts: TracebackOption = DEFAULT_OPTS) {
    const $container = document.querySelector(selectors);

    if ($container === null) {
        throw new Error(`查询${selectors}失败，请确保页面上存在 traceback.js 的渲染容器`);
    }
    
    return (rawInput: string) => {
        const $list = document.createElement('ol');
        const $style = document.createElement('style');
        const { separator, start, highlightRow } = opts;
        console.time('tracebackjs');

        const rawList = rawInput.split(separator);

        rawList.forEach((raw, index) => {
            if (index < start - 1) return;

            let className = classNames.item;
            const $li = document.createElement('li');

            if (index === highlightRow - 1) {
                className = classNames.highlightRow;
            }

            $li.className = className;
            $li.textContent = raw;
            $list.appendChild($li);
        });
        
        $list.start = start;
        $list.className = classNames.container;
        $container.appendChild($list);
        $style.textContent = stylesheet.replace(/\n\s*/gm, '');
        $container.appendChild($style);
        $list.addEventListener('click', (e) => {
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
