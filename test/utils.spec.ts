import { should, expect } from 'chai';

import { parseRows, defaultRows } from '../src/utils';

describe('通用函数_utils', () => {
    it('测试解析展示行数是否正确', () => {
        const rows: displayRows = { upward: 10, downward: -1 };

        expect(parseRows(-1)).to.eql({ upward: -1, downward: -1 });
        expect(parseRows(rows)).to.eql(rows);
        expect(parseRows('-5+4')).to.eql({ upward: 5, downward: 4 });
        expect(parseRows('abc')).to.eql(defaultRows);
    });
});
