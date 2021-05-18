// eslint-disable-next-line import/no-extraneous-dependencies
const { createFilter } = require('rollup-pluginutils');

/** 默认压缩规则 */
const REG_WHITESPACE = /\r?\n\s*/gm;
const REG_COMMENT = /\/\*.+?\*\//gm;
const defaultReplacer = (code) => {
    return code
        .replace(REG_WHITESPACE, '')
        .replace(REG_COMMENT, '');
};

/**
 * 转化 css 文件代码为 js 静态导出。
 * 参照：`rollup-plugin-string`
 * 
 * @param {object} opts 配置对象。可传入 `replacer` 修改源代码
 */
export default function CssStringify(opts = {}) {
    const filter = createFilter(opts.include, opts.exclude);
    const replacer = opts.replacer || defaultReplacer;

    return {
        name: 'css-stringify',
        transform(code, id) {
            if (filter(id)) {
                return {
                    code: `export default ${JSON.stringify(replacer(code))}`,
                    map: { mappings: '' },
                };
            }
            return undefined;
        },
    };
}
