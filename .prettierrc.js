//.prettier.js
// eslint-disable-next-line no-undef
module.exports = {
  // 超过最大值换行
  printWidth: 130,
  // 缩进字节数
  tabWidth: 2,
  // 使用制表符而不是空格缩进
  useTabs: true,
  // 结尾用分号，false为不用
  semi: true,
  // 使用单引号(true 单双引号,false双引号)
  singleQuote: false,
  //更改引用对象属性的时间可选值"<as-needed | consistent |preserve>"
  quoteProps: 'as-needed',
  //在对象,数组括号与文字之间加空格“{ foo: bar }”
  bracketspacing: true,
  //多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。)可选值"<none|es5|all>"，默认none
  trailingComma: 'none',
  //在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  //(x)={箭头函数参数只有一个时是否要有小括号。avoid:省略括号,always:不省略括号
  arrowParens: 'avoid',
  //如果文件顶部已经有一个 doclock，这个选项将新建一行注释，并打上@format标记。
  insertPragma: false,
  //指定要使用的解析器,不需要写文件开头的@prettier
  requirePragma: false,
  //默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment)而按照markdown文本样式进行折行
  prosewrap: 'preserve',
  //在html中空格是否是敏感的“css”-遵守Css显示属性的默认值，“strict”-空格被认为是敏感的，"ignore”-空格被认为是不敏感的
  htmlwhitespacesensitivity: 'css',
  //换行符使用lf 结尾是可选值"<auto| lf| crlf | cr>"
  endofLine: 'auto',
  //这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangestart: 0,
  rangeEnd: Infinity,
  //vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
}
