import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json";

const input = "src/index.ts";
const external = [...Object.keys(pkg.dependencies || {})];

const config = [
  // ESM build
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    external,
    plugins: [typescript(), resolve(), commonjs()],
  },
  // UMD build
  {
    input,
    output: {
      name: "DateRangeToolkit",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), commonjs(), terser()],
  },
  // CommonJS build
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    external,
    plugins: [typescript(), resolve(), commonjs()],
  },
];

export default config;
