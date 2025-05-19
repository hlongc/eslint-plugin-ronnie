/**
 * @fileoverview 限制嵌套三层以上的三元运算符
 * @author ronnie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
const rules = requireIndex(__dirname + "/rules");

module.exports = {
  // 导出所有规则
  rules,
  // 插件配置
  configs: {
    // 推荐配置
    recommended: {
      // 环境设置为浏览器
      env: ["browser"],
      // 使用ronnie插件
      plugins: ["ronnie"],
      // 启用的规则及其错误级别
      rules: {
        // 禁止使用eval函数
        "ronnie/forbidden-eval": "error",
        // 禁止嵌套三元表达式
        "ronnie/ternary-operator": "error",
      },
    },
  },
};
