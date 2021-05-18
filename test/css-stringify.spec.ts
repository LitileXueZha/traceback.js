import { expect } from 'chai';

import CssStringify from '../plugin/css-stringify.js';

const CSS_SOURCE = `
    .head {
        display: block;
        /* display: block; */
        size: large;
        /* display: block; */
    }
    a { color: #red; }
`;
const EXPECT_CSS = 'export default ".head {display: block;size: large;}a { color: #red; }"';

describe('插件_css-stringify', () =>{
    it('测试导入 css 文件内容是否正确', () => {
        const css = CssStringify();
        const output = css.transform(CSS_SOURCE, '');

        if (output) {
            expect(output.code).to.eqls(EXPECT_CSS);
        }
    });

    it('测试传入配置是否正确', () => {
        const cssExclude = CssStringify({ exclude: /node_modules/ });
        const output1 = cssExclude.transform(CSS_SOURCE, 'node_modules/chai/a.js');

        expect(output1).to.be.undefined;

        const cssReplacer = CssStringify({ replacer: (code: string) => code });
        const output2 = cssReplacer.transform(CSS_SOURCE, '');
        const expectCss = `export default ${JSON.stringify(CSS_SOURCE)}`;

        if (output2) {
            expect(output2.code).to.eqls(expectCss);
        }
    });
});
