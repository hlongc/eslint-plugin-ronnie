# eslint 插件开发流程

## 使用官方脚手架开发

```sh
npm i -g yo
npm i -g generator-eslint
```

## 使用命令生成项目框架

```sh
yo eslint:plugin
```

## 创建规则

```sh
npx yo eslint:rule
```

# eslint-plugin-ronnie 使用

限制嵌套三层以上的三元运算符

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ronnie`:

```sh
npm install eslint-plugin-ronnie --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-ronnie` and add `ronnie` to the `plugins` key:

```js
import ronnie from "eslint-plugin-ronnie";

export default [
  {
    plugins: {
      ronnie,
    },
  },
];
```

Then configure the rules you want to use under the `rules` key.

```js
import ronnie from "eslint-plugin-ronnie";

export default [
  {
    plugins: {
      ronnie,
    },
    rules: {
      "ronnie/rule-name": "warn",
    },
  },
];
```

## Configurations

<!-- begin auto-generated configs list -->

TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
