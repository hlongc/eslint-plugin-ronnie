/**
 * @fileoverview 限制嵌套三个及以上三元运算符
 * @author ronnie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/ternary-operator"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run("ternary-operator", rule, {
  valid: [
    // 单个三元运算符
    "const result = condition ? valueTrue : valueFalse;",

    // 两层嵌套的三元运算符
    "const result = condition1 ? (condition2 ? value1 : value2) : value3;",
    "const result = condition1 ? value1 : (condition2 ? value2 : value3);",

    // 三层嵌套的三元运算符 (最大允许深度)
    "const result = a ? (b ? (c ? d : e) : f) : g;",
    "const result = a ? b : (c ? (d ? e : f) : g);",
    "const result = a ? (b ? c : (d ? e : f)) : g;",

    // 不同位置的三层嵌套
    "const result = a ? b : (c ? (d ? e : f) : (g ? h : i));",
    "function test() { return a ? (b ? c : (d ? e : f)) : g; }",

    // 在表达式中使用三元运算符
    "const obj = { key: a ? (b ? c : d) : (e ? f : g) };",
    "const arr = [a ? b : (c ? d : (e ? f : g))];",
  ],

  invalid: [
    // 四层嵌套 - 在条件部分嵌套过深
    {
      code: "const result = a ? (b ? (c ? (d ? e : f) : g) : h) : i;",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },

    // 四层嵌套 - 在结果部分嵌套过深
    {
      code: "const result = a ? (b ? (c ? d : (e ? f : g)) : h) : i;",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },

    // 四层嵌套 - 在替代部分嵌套过深
    {
      code: "const result = a ? b : (c ? d : (e ? f : (g ? h : i)));",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },

    // 五层嵌套 - 极端情况
    {
      code: "const result = a ? (b ? (c ? (d ? (e ? f : g) : h) : i) : j) : k;",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },

    // 在函数中嵌套过深
    {
      code: "function test() { return a ? b : (c ? (d ? (e ? f : g) : h) : i); }",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },

    // 在对象中嵌套过深
    {
      code: "const obj = { key: a ? (b ? (c ? (d ? e : f) : g) : h) : i };",
      errors: [
        {
          messageId: "limitNested",
          type: "ConditionalExpression",
        },
      ],
    },
  ],
});
