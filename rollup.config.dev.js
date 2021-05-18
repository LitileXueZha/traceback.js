import ts from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
// import { string } from 'rollup-plugin-string';
import css from './plugin/css-stringify';
import { version } from './package.json';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'iife',
        name: 'TracebackJS',
        sourcemap: 'inline',
    },
    plugins: [
        replace({
            'process.env.VERSION': JSON.stringify(version),
            preventAssignment: true,
        }),
        css({ include: './src/*.css', replacer: (code) => code }),
        ts(),
        serve({ port: 9010, contentBase: './' }),
        livereload('dist'),
    ],
};
