import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import progress from "rollup-plugin-progress";
import sizes from "rollup-plugin-sizes";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import analyze from "rollup-plugin-analyzer";

const limitBytes = 1e6;

const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return;
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
  return process.exit(1);
};

module.exports = {
  input: "src/ts/build/es6/csvx.js",
  output: {
    name: "CSVx",
    file: "src/ts/build/csvx.iife.js",
    format: "iife"
  },
  external: [], // <-- suppresses the warning
  plugins: [
    resolve(),
    commonjs(),
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    }),
    progress({
      clearLine: false // default: true
    }),
    sizes(),
    sizeSnapshot(),
    analyze({ onAnalysis, skipFormatted: false })
  ]
};
