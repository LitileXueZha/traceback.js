const { createFilter } = require("rollup-pluginutils");

/**
 * 转化 css 文件代码为 js 静态导出。
 * 参照：`rollup-plugin-string`
 * 
 * @param {object} opts 配置对象。可传入 `replacer` 修改源代码
 */
export default function CssStringify(opts = {}) {
    const filter = createFilter(opts.include, opts.exclude);

    // 默认压缩规则
    if (!opts.replacer) opts.replacer = code => code.replace(/\n\s*/gm, '');

    return {
        name: 'css-stringify',
        transform(code, id) {
            if (filter(id)) {
                return {
                    code: `export default ${JSON.stringify(opts.replacer(code))}`,
                    map: { mappings: '' },
                };
            }
        },
    };
}
