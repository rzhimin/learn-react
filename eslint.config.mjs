/**
 * 用于配置 ESLint 的文件，它是 ESLint 8.x 版本引入的新的配置文件格式。与传统的 .eslintrc.js 或 .eslintrc.json 文件相比，eslint.config.mjs 是一个基于 ES 模块（ESM）的配置文件，支持使用 import 和 export 语法
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'no-unused-vars': 'warn', // 自定义规则
      'react/react-in-jsx-scope': 'off' // 覆盖 React 插件的规则
    }
  }
];