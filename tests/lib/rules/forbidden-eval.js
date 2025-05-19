/**
 * @fileoverview 禁用eval
 * @author ronnie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/forbidden-eval"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run("forbidden-eval", rule, {
  valid: [
    // 普通函数调用，不是eval
    "foo();",

    // 普通变量声明和赋值
    "const x = 5;",
    "let func = function() {};",

    // 名称相似但不是eval的标识符
    "const evalution = 'not eval';",
    "function evaluation() { return 'safe'; }",

    // 对象属性中有eval字符串
    "const obj = { eval: 'not the real eval' };",
    "obj.eval = 'still safe';",

    // 字符串中包含eval
    "'eval is dangerous';",
    "`avoid using eval`;",

    // 注释中包含eval
    "// eval should be avoided",
    "/* eval is not good practice */",

    // 作为对象方法名
    "const obj = { eval() { return 'safe'; } };",
  ],

  invalid: [
    // 直接调用eval
    {
      code: "eval('console.log(\"hello\")');",
      errors: [
        {
          messageId: "forbiddenEval",
          type: "CallExpression",
        },
      ],
    },

    // 将eval赋值给变量
    {
      code: "const myEval = eval;",
      errors: [
        {
          messageId: "forbiddenEval",
          type: "VariableDeclarator",
        },
      ],
    },

    // 将eval赋值给已存在的变量
    {
      code: "let func; func = eval;",
      errors: [
        {
          messageId: "forbiddenEval",
          type: "AssignmentExpression",
        },
      ],
    },

    // 多个违规情况
    {
      code: "const e = eval; function test() { eval('alert(1)'); }",
      errors: [
        {
          messageId: "forbiddenEval",
          type: "VariableDeclarator",
        },
        {
          messageId: "forbiddenEval",
          type: "CallExpression",
        },
      ],
    },

    // 在复杂表达式中使用eval
    {
      code: "const result = condition ? eval : console.log;",
      errors: [
        {
          messageId: "forbiddenEval",
          type: "Identifier",
        },
      ],
    },
  ],
});
