---
id: option-space-in-paren
title: Space In Paren
sidebar_label: ✅ Space In Paren
edit_url: https://github.com/unibeautify/unibeautify/edit/master/src/options.ts
---
**Key**: `space_in_paren`

**Description**: Add padding spaces within parentheses, ie. f( a, b )

**Type**: `boolean`

**Default**: `false`

## Support
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/edit/master/docs/../scripts/generate-docs/beautifiers.ts" target="_blank">Edit Beautifiers</a></div>

**Languages**: [EJS](/docs/language-ejs.html), [JSON](/docs/language-json.html), [JSX](/docs/language-jsx.html), [JavaScript](/docs/language-javascript.html)

**Beautifiers**: [JS-Beautify](/docs/beautifier-js-beautify.html)

<details><summary><strong>Comparison Table</strong></summary>
| Language | [JS-Beautify](/docs/beautifier-js-beautify.html) |
| --- | --- |
| [EJS](/docs/language-ejs.html) | &#9989; |
| [JSON](/docs/language-json.html) | &#9989; |
| [JSX](/docs/language-jsx.html) | &#9989; |
| [JavaScript](/docs/language-javascript.html) | &#9989; |
</details>
## Examples
### EJS
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/EJS/new?filename=space_in_paren.txt&value=Type%20Example%20Here" target="_blank">Add EJS Example</a></div>

No example found. Please submit a Pull Request!
### JSON
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/JSON/new?filename=space_in_paren.txt&value=Type%20Example%20Here" target="_blank">Add JSON Example</a></div>

No example found. Please submit a Pull Request!
### JSX
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/new/master/docs/../examples/JSX/new?filename=space_in_paren.txt&value=Type%20Example%20Here" target="_blank">Add JSX Example</a></div>

No example found. Please submit a Pull Request!
### JavaScript
<div><a class="edit-page-link button" href="https://github.com/unibeautify/website/edit/master/docs/../examples/JavaScript/space_in_paren.txt" target="_blank">Edit JavaScript Example</a></div>

<details><summary><strong>🚧 Original Code</strong></summary>
```JavaScript
const fun1 = function(arg1, arg2) {
}
const fun2 = function(arg1,arg2) {
}
const fun3 = function( arg1, arg2 ) {
}

```
</details>
<details><summary><strong>🔧 `true`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```JavaScript
const fun1 = function( arg1, arg2 ) {}
const fun2 = function( arg1, arg2 ) {}
const fun3 = function( arg1, arg2 ) {}
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "JavaScript": {
    "indent_size": 2,
    "indent_char": " ",
    "space_in_paren": true
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
@@ -1,6 +1,3 @@
-const␣fun1␣=␣function(arg1,␣arg2)␣{␊
-}␊
-const␣fun2␣=␣function(arg1,arg2)␣{␊
-}␊
-const␣fun3␣=␣function(␣arg1,␣arg2␣)␣{␊
-}␊
+const␣fun1␣=␣function(␣arg1,␣arg2␣)␣{}␊
+const␣fun2␣=␣function(␣arg1,␣arg2␣)␣{}␊
+const␣fun3␣=␣function(␣arg1,␣arg2␣)␣{}
\ No newline at end of file

```
</details>
</details>
<details><summary><strong>🔧 `false`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```JavaScript
const fun1 = function(arg1, arg2) {}
const fun2 = function(arg1, arg2) {}
const fun3 = function(arg1, arg2) {}
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "JavaScript": {
    "indent_size": 2,
    "indent_char": " ",
    "space_in_paren": false
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
@@ -1,6 +1,3 @@
-const␣fun1␣=␣function(arg1,␣arg2)␣{␊
-}␊
-const␣fun2␣=␣function(arg1,arg2)␣{␊
-}␊
-const␣fun3␣=␣function(␣arg1,␣arg2␣)␣{␊
-}␊
+const␣fun1␣=␣function(arg1,␣arg2)␣{}␊
+const␣fun2␣=␣function(arg1,␣arg2)␣{}␊
+const␣fun3␣=␣function(arg1,␣arg2)␣{}
\ No newline at end of file

```
</details>
</details>