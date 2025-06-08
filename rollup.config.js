import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const input = 'src/index.ts';
const external = [...Object.keys(pkg.dependencies || {})];

const terserConfig = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
    passes: 3,
  },
  mangle: {
    properties: {
      regex: /^_/, // Only mangle properties starting with underscore
    },
  },
  format: {
    comments: false,
  },
};

const config = [
  // ESM build - primary format
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
      }),
      resolve(),
      commonjs(),
      terser(terserConfig),
    ],
  },
  // UMD build - minified
  {
    input,
    output: {
      name: 'DateRangeToolkit',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      compact: true,
    },
    plugins: [
      typescript(),
      resolve({
        browser: true,
      }),
      commonjs(),
      terser(terserConfig),
    ],
  },
  // CommonJS build
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      compact: true,
    },
    external,
    plugins: [typescript(), resolve(), commonjs(), terser(terserConfig)],
  },
];

export default config;
