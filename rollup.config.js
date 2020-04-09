import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { string } from 'rollup-plugin-string';

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
        string({ include: "./src/*.css" }),
        ts(),
    ],
};
