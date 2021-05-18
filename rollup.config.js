import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
// import { string } from 'rollup-plugin-string';
import css from './plugin/css-stringify';
import { version } from './package.json';

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
        replace({
            'process.env.VERSION': JSON.stringify(version),
            preventAssignment: true,
        }),
        css({ include: './src/*.css' }),
        ts(),
    ],
};
