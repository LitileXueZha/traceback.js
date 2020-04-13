import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
// import { string } from 'rollup-plugin-string';
import css from './plugin/css-stringify';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'es',
        }, {
            file: 'dist/index.min.js',
            format: 'iife',
            name: 'TracebackJS',
            plugins: [terser()],
        },
    ],
    plugins: [
        css({ include: "./src/*.css" }),
        ts(),
    ],
};
