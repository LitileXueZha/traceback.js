import { parseRows } from './utils';
import formatter from './formatter';
import renderer, { classNames } from './renderer';

const VERSION = '0.0.1';
const DEFAULT_OPTS: TracebackOption = {
    start: 1,
    separator: '\n',
    highlightRow: 1,
    displayRows: '-5+5',
};


/**
 * 初始化
 * 
 * 返回渲染函数，入参即为需要渲染的源文本。
 * 用法：`TracebackJS.init('.traceback-js', {})(text);`
 * 
 * @param {string} selectors DOM 选择符，同 `querySelector`
 * @param {object} opts 配置对象
 * @return {function} 渲染函数，参数为源文本
 */
function init(selectors: string, opts: TracebackOption = DEFAULT_OPTS) {
    const $rootEl = document.querySelector(selectors);

    if ($rootEl === null) {
        console.warn(`查询${selectors}失败，请确保页面上存在此元素`);
        return () => {};
    }

    const options = {
        ...DEFAULT_OPTS,
        ...opts,
        // 解析展示规则
        displayRows: parseRows(opts.displayRows || DEFAULT_OPTS.displayRows),
    };

    return function render(rawInput: string) {
        const formatRows = formatter(rawInput, options);
        const $result = renderer(formatRows);

        if (!$result) {
            return;
        }
        $rootEl.appendChild($result);

        // TODO: 额外的功能转化为插件形式
        let $rowClicked: HTMLElement | null = null;

        $rootEl.addEventListener('click', (e) => {
            // @ts-ignore
            const { className, parentNode } = e.target;

            if (className === classNames.index && parentNode !== $rowClicked) {
                // eslint-disable-next-line no-unused-expressions
                $rowClicked?.classList.remove(classNames.clickedRow);
                parentNode.classList.add(classNames.clickedRow);
                $rowClicked = parentNode;
            }
        });
    };
}

/**
 * 渲染为 html 字符串
 * 
 * @param {string} rawInput 源文本
 * @param {TracebackOption} opts 配置对象
 * @returns {string} html 字符串
 */
function renderToString(rawInput: string, opts: TracebackOption = DEFAULT_OPTS): string {
    const options = {
        ...DEFAULT_OPTS,
        ...opts,
        // 解析展示规则
        displayRows: parseRows(opts.displayRows || DEFAULT_OPTS.displayRows),
    };
    const formatRows = formatter(rawInput, options);
    const $result = renderer(formatRows);

    if (!$result) {
        return '';
    }

    // 创建临时元素，转为 html 字符串
    const $tmp = document.createElement('div');

    $tmp.appendChild($result);
    return $tmp.innerHTML;
}

// TODO: 统一设置配置对象
function setOptions() {}

export default {
    version: VERSION,
    init,
    renderToString,
};
