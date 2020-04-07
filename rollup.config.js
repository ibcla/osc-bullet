import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { uglify } from "rollup-plugin-uglify";
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/osc-bullet.min.js',
      format: 'umd',
      sourcemap: true,
      globals: {
        jquery: '$'
      }
    }
  ],
  external: ['jquery'],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: './dist/osc-bullet.min.css',
      minimize: production && true,
      sourceMap: true,
      plugins: [
        autoprefixer({
          grid: true
        })
      ]
    }),
    production && babel({
      babelrc: false,
      presets: [['@babel/preset-env']],
      exclude: 'node_modules/**'
    }),
    production && uglify(),
  ]
};
