/**
 * @fileoverview 限制嵌套三个及以上三元运算符
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
      description: "限制嵌套三个及以上三元运算符",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      limitNested: "禁止嵌套三层以上的三元运算符，可读性很差",
    }, // Add messageId and message
  },

  create(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    /**
     * 检查三元运算符的嵌套深度
     * @param {import('estree').ConditionalExpression} node - 三元运算符节点
     * @param {number} depth - 当前深度
     */
    function checkConditionalDepth(node, depth) {
      // 如果当前深度已经超过3层，则报错
      if (depth > 3) {
        context.report({
          node,
          messageId: "limitNested",
        });
        return;
      }

      // 递归检查三元运算符的条件部分
      if (node.test && node.test.type === "ConditionalExpression") {
        checkConditionalDepth(node.test, depth + 1);
      }

      // 递归检查三元运算符的结果部分
      if (node.consequent && node.consequent.type === "ConditionalExpression") {
        checkConditionalDepth(node.consequent, depth + 1);
      }

      // 递归检查三元运算符的替代部分
      if (node.alternate && node.alternate.type === "ConditionalExpression") {
        checkConditionalDepth(node.alternate, depth + 1);
      }
    }

    return {
      // 只处理顶层的三元运算符，避免重复计算
      ConditionalExpression(node) {
        // 检查当前节点是否是顶层三元运算符
        const parent = node.parent;
        if (parent && parent.type === "ConditionalExpression") {
          // 如果父节点也是三元运算符，则跳过，因为会在处理父节点时一并处理
          return;
        }

        // 从顶层三元运算符开始计算深度
        checkConditionalDepth(node, 1);
      },
    };
  },
};
