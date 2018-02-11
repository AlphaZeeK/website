---
id: option-object-curly-spacing
title: Object Curly Spacing
sidebar_label: ✅ Object Curly Spacing
edit_url: https://github.com/unibeautify/unibeautify/edit/master/src/options.ts
---
**Key**: `object_curly_spacing`

**Description**: Inserts a space before/after brackets for object literals, destructuring assignments, and import/export specifiers

**Type**: `boolean`

**Default**: `true`

## Support
**Languages**: [CSS](/docs/language-css.html), [GraphQL](/docs/language-graphql.html), [JSON](/docs/language-json.html), [JSX](/docs/language-jsx.html), [JavaScript](/docs/language-javascript.html), [Less](/docs/language-less.html), [SCSS](/docs/language-scss.html), [TypeScript](/docs/language-typescript.html), [Vue](/docs/language-vue.html)

**Beautifiers**: [Prettier](/docs/beautifier-prettier.html), [ESLint](/docs/beautifier-eslint.html)

<details><summary><strong>Comparison Table</strong></summary>
| Language | [Prettier](/docs/beautifier-prettier.html) | [ESLint](/docs/beautifier-eslint.html) |
| --- | --- | --- |
| [CSS](/docs/language-css.html) | &#9989; | &#10060; |
| [GraphQL](/docs/language-graphql.html) | &#9989; | &#10060; |
| [JSON](/docs/language-json.html) | &#9989; | &#10060; |
| [JSX](/docs/language-jsx.html) | &#9989; | &#9989; |
| [JavaScript](/docs/language-javascript.html) | &#9989; | &#9989; |
| [Less](/docs/language-less.html) | &#9989; | &#10060; |
| [SCSS](/docs/language-scss.html) | &#9989; | &#10060; |
| [TypeScript](/docs/language-typescript.html) | &#9989; | &#10060; |
| [Vue](/docs/language-vue.html) | &#9989; | &#10060; |
</details>
## Examples
### CSS
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/CSS/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add CSS Example</a></div>

No example found. Please submit a Pull Request!
### GraphQL
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/GraphQL/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add GraphQL Example</a></div>

No example found. Please submit a Pull Request!
### JSON
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/JSON/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add JSON Example</a></div>

No example found. Please submit a Pull Request!
### JSX
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/JSX/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add JSX Example</a></div>

No example found. Please submit a Pull Request!
### JavaScript
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/edit/master/docs/../examples/JavaScript/object_curly_spacing.txt" target="_blank">Edit JavaScript Example</a></div>

<details><summary><strong>🚧 Original Code</strong></summary>
```JavaScript
// simple object literals
var obj = { foo: "bar" };

// nested object literals
var obj = { foo: { zoo: "bar" } };

// destructuring assignment (EcmaScript 6)
var { x, y } = y;

// import/export declarations (EcmaScript 6)
import { foo } from "bar";
export { foo };
```
</details>
<details><summary><strong>🔧 `true`</strong></summary>
Using [Prettier](/docs/beautifier-prettier.html) beautifier:
```JavaScript
// simple object literals
var obj = { foo: "bar" };

// nested object literals
var obj = { foo: { zoo: "bar" } };

// destructuring assignment (EcmaScript 6)
var { x, y } = y;

// import/export declarations (EcmaScript 6)
import { foo } from "bar";
export { foo };

```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "JavaScript": {
    "indent_size": 2,
    "indent_char": " ",
    "object_curly_spacing": true
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: true
===================================================================
--- true	Original
+++ true	Beautified
@@ -8,5 +8,5 @@
 var␣{␣x,␣y␣}␣=␣y;␊
 ␊
 //␣import/export␣declarations␣(EcmaScript␣6)␊
 import␣{␣foo␣}␣from␣"bar";␊
-export␣{␣foo␣};
\ No newline at end of file
+export␣{␣foo␣};␊

```
</details>
</details>
<details><summary><strong>🔧 `false`</strong></summary>
Using [Prettier](/docs/beautifier-prettier.html) beautifier:
```JavaScript
// simple object literals
var obj = {foo: "bar"};

// nested object literals
var obj = {foo: {zoo: "bar"}};

// destructuring assignment (EcmaScript 6)
var {x, y} = y;

// import/export declarations (EcmaScript 6)
import {foo} from "bar";
export {foo};

```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "JavaScript": {
    "indent_size": 2,
    "indent_char": " ",
    "object_curly_spacing": false
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: false
===================================================================
--- false	Original
+++ false	Beautified
@@ -1,12 +1,12 @@
 //␣simple␣object␣literals␊
-var␣obj␣=␣{␣foo:␣"bar"␣};␊
+var␣obj␣=␣{foo:␣"bar"};␊
 ␊
 //␣nested␣object␣literals␊
-var␣obj␣=␣{␣foo:␣{␣zoo:␣"bar"␣}␣};␊
+var␣obj␣=␣{foo:␣{zoo:␣"bar"}};␊
 ␊
 //␣destructuring␣assignment␣(EcmaScript␣6)␊
-var␣{␣x,␣y␣}␣=␣y;␊
+var␣{x,␣y}␣=␣y;␊
 ␊
\ No newline at end of file
 //␣import/export␣declarations␣(EcmaScript␣6)␊
-import␣{␣foo␣}␣from␣"bar";␊
-export␣{␣foo␣};
+import␣{foo}␣from␣"bar";␊
+export␣{foo};␊

```
</details>
</details>
### Less
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/Less/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add Less Example</a></div>

No example found. Please submit a Pull Request!
### SCSS
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/SCSS/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add SCSS Example</a></div>

No example found. Please submit a Pull Request!
### TypeScript
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/TypeScript/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add TypeScript Example</a></div>

No example found. Please submit a Pull Request!
### Vue
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/Vue/new?filename=object_curly_spacing.txt&value=Type%20Example%20Here" target="_blank">Add Vue Example</a></div>

No example found. Please submit a Pull Request!