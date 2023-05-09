import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input : "src/index.js",
    output: {
        file: "lib/NonnySignature.js",
        format: "iife",
        name: "NonnySignature"
    },
    plugins: [
        resolve(),
        commonjs()
      ]
}