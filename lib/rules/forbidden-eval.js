/**
 * @fileoverview 禁用eval
 * @author ronnie
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "禁用eval",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      forbiddenEval: "禁止使用eval函数，eval存在安全风险且影响性能",
    }, // Add messageId and message
  },

  create(context) {
    return {
      // 检查直接调用eval
      CallExpression(node) {
        if (node.callee.type === "Identifier" && node.callee.name === "eval") {
          context.report({
            node,
            messageId: "forbiddenEval",
          });
        }
      },

      // 检查将eval赋值给变量
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "Identifier" &&
          node.init.name === "eval"
        ) {
          context.report({
            node,
            messageId: "forbiddenEval",
          });
        }
      },

      // 检查将eval赋值给其他变量
      AssignmentExpression(node) {
        if (node.right.type === "Identifier" && node.right.name === "eval") {
          context.report({
            node,
            messageId: "forbiddenEval",
          });
        }
      },

      // 检查在三元表达式等位置直接引用eval
      Identifier(node) {
        // 只检查名为eval的标识符
        if (node.name !== "eval") {
          return;
        }

        const parent = node.parent;

        // 已经在其他规则中处理的情况，避免重复报错
        if (
          // 函数调用已在CallExpression中处理
          (parent.type === "CallExpression" && parent.callee === node) ||
          // 变量声明已在VariableDeclarator中处理
          (parent.type === "VariableDeclarator" && parent.init === node) ||
          // 赋值表达式已在AssignmentExpression中处理
          (parent.type === "AssignmentExpression" && parent.right === node) ||
          // 作为对象属性名不报错
          (parent.type === "Property" &&
            parent.key === node &&
            !parent.computed) ||
          // 作为对象属性访问不报错
          (parent.type === "MemberExpression" &&
            parent.property === node &&
            !parent.computed)
        ) {
          return;
        }

        // 其他直接使用eval的情况
        context.report({
          node,
          messageId: "forbiddenEval",
        });
      },
    };
  },
};
