import ts from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { string } from 'rollup-plugin-string';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'iife',
        name: 'TracebackJS',
        sourcemap: 'inline',
    },
    plugins: [
        string({ include: "./src/*.css" }),
        ts(),
        serve({ port: 9010, contentBase: './' }),
        livereload('dist'),
    ],
};
