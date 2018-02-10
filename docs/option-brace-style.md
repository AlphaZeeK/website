---
id: option-brace-style
title: Brace Style
sidebar_label: ✅ Brace Style
edit_url: https://github.com/unibeautify/unibeautify/edit/master/src/options.ts
---
**Key**: `brace_style`

**Description**: Brace style

**Type**: `string`

**Default**: `"collapse"`

**Allowed values**: `"collapse"` or `"collapse-preserve-inline"` or `"expand"` or `"end-expand"` or `"none"`

## Support
**Languages**: [EJS](/docs/language-ejs.html), [HTML](/docs/language-html.html), [Handlebars](/docs/language-handlebars.html), [JSON](/docs/language-json.html), [JSX](/docs/language-jsx.html), [JavaScript](/docs/language-javascript.html), [Liquid](/docs/language-liquid.html), [Mustache](/docs/language-mustache.html), [XML](/docs/language-xml.html)

**Beautifiers**: [JS-Beautify](/docs/beautifier-js-beautify.html)

<details><summary><strong>Comparison Table</strong></summary>
| Language | [JS-Beautify](/docs/beautifier-js-beautify.html) |
| --- | --- |
| [EJS](/docs/language-ejs.html) | &#9989; |
| [HTML](/docs/language-html.html) | &#9989; |
| [Handlebars](/docs/language-handlebars.html) | &#9989; |
| [JSON](/docs/language-json.html) | &#9989; |
| [JSX](/docs/language-jsx.html) | &#9989; |
| [JavaScript](/docs/language-javascript.html) | &#9989; |
| [Liquid](/docs/language-liquid.html) | &#9989; |
| [Mustache](/docs/language-mustache.html) | &#9989; |
| [XML](/docs/language-xml.html) | &#9989; |
</details>
## Examples
### HTML
<details><summary><strong>🚧 Original Code</strong></summary>
```HTML
<div>
<h1>Unformatted</h1>
<div>
<span>Un<span>formatted</span></span>
</div>
<span><span>For</span><span>mat</span><span>ted</span></span>
<div><div>For</div><div>mat</div><div>ted</div></div>
</div>

```
</details>
<details><summary><strong>🔧 `"collapse"`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```HTML
<div>
  <h1>Unformatted</h1>
  <div>
    <span>Un<span>formatted</span></span>
  </div>
  <span><span>For</span><span>mat</span><span>ted</span></span>
  <div>
    <div>For</div>
    <div>mat</div>
    <div>ted</div>
  </div>
</div>
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "HTML": {
    "indent_size": 2,
    "indent_char": " ",
    "brace_style": "collapse"
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: collapse
===================================================================
--- collapse	Original
+++ collapse	Beautified
@@ -1,8 +1,12 @@
 <div>␊
-<h1>Unformatted</h1>␊
-<div>␊
-<span>Un<span>formatted</span></span>␊
-</div>␊
-<span><span>For</span><span>mat</span><span>ted</span></span>␊
-<div><div>For</div><div>mat</div><div>ted</div></div>␊
-</div>␊
+␣␣<h1>Unformatted</h1>␊
+␣␣<div>␊
+␣␣␣␣<span>Un<span>formatted</span></span>␊
+␣␣</div>␊
+␣␣<span><span>For</span><span>mat</span><span>ted</span></span>␊
+␣␣<div>␊
+␣␣␣␣<div>For</div>␊
+␣␣␣␣<div>mat</div>␊
+␣␣␣␣<div>ted</div>␊
+␣␣</div>␊
+</div>
\ No newline at end of file

```
</details>
</details>
<details><summary><strong>🔧 `"collapse-preserve-inline"`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```HTML
<div>
  <h1>Unformatted</h1>
  <div>
    <span>Un<span>formatted</span></span>
  </div>
  <span><span>For</span><span>mat</span><span>ted</span></span>
  <div>
    <div>For</div>
    <div>mat</div>
    <div>ted</div>
  </div>
</div>
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "HTML": {
    "indent_size": 2,
    "indent_char": " ",
    "brace_style": "collapse-preserve-inline"
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: collapse-preserve-inline
===================================================================
--- collapse-preserve-inline	Original
+++ collapse-preserve-inline	Beautified
@@ -1,8 +1,12 @@
 <div>␊
-<h1>Unformatted</h1>␊
-<div>␊
-<span>Un<span>formatted</span></span>␊
-</div>␊
-<span><span>For</span><span>mat</span><span>ted</span></span>␊
-<div><div>For</div><div>mat</div><div>ted</div></div>␊
-</div>␊
+␣␣<h1>Unformatted</h1>␊
+␣␣<div>␊
+␣␣␣␣<span>Un<span>formatted</span></span>␊
+␣␣</div>␊
+␣␣<span><span>For</span><span>mat</span><span>ted</span></span>␊
+␣␣<div>␊
+␣␣␣␣<div>For</div>␊
+␣␣␣␣<div>mat</div>␊
+␣␣␣␣<div>ted</div>␊
+␣␣</div>␊
+</div>
\ No newline at end of file

```
</details>
</details>
<details><summary><strong>🔧 `"expand"`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```HTML
<div>
  <h1>Unformatted</h1>
  <div>
    <span>Un<span>formatted</span></span>
  </div>
  <span><span>For</span><span>mat</span><span>ted</span></span>
  <div>
    <div>For</div>
    <div>mat</div>
    <div>ted</div>
  </div>
</div>
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "HTML": {
    "indent_size": 2,
    "indent_char": " ",
    "brace_style": "expand"
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: expand
===================================================================
--- expand	Original
+++ expand	Beautified
@@ -1,8 +1,12 @@
 <div>␊
-<h1>Unformatted</h1>␊
-<div>␊
-<span>Un<span>formatted</span></span>␊
-</div>␊
-<span><span>For</span><span>mat</span><span>ted</span></span>␊
-<div><div>For</div><div>mat</div><div>ted</div></div>␊
-</div>␊
+␣␣<h1>Unformatted</h1>␊
+␣␣<div>␊
+␣␣␣␣<span>Un<span>formatted</span></span>␊
+␣␣</div>␊
+␣␣<span><span>For</span><span>mat</span><span>ted</span></span>␊
+␣␣<div>␊
+␣␣␣␣<div>For</div>␊
+␣␣␣␣<div>mat</div>␊
+␣␣␣␣<div>ted</div>␊
+␣␣</div>␊
+</div>
\ No newline at end of file

```
</details>
</details>
<details><summary><strong>🔧 `"end-expand"`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```HTML
<div>
  <h1>Unformatted</h1>
  <div>
    <span>Un<span>formatted</span></span>
  </div>
  <span><span>For</span><span>mat</span><span>ted</span></span>
  <div>
    <div>For</div>
    <div>mat</div>
    <div>ted</div>
  </div>
</div>
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "HTML": {
    "indent_size": 2,
    "indent_char": " ",
    "brace_style": "end-expand"
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: end-expand
===================================================================
--- end-expand	Original
+++ end-expand	Beautified
@@ -1,8 +1,12 @@
 <div>␊
-<h1>Unformatted</h1>␊
-<div>␊
-<span>Un<span>formatted</span></span>␊
-</div>␊
-<span><span>For</span><span>mat</span><span>ted</span></span>␊
-<div><div>For</div><div>mat</div><div>ted</div></div>␊
-</div>␊
+␣␣<h1>Unformatted</h1>␊
+␣␣<div>␊
+␣␣␣␣<span>Un<span>formatted</span></span>␊
+␣␣</div>␊
+␣␣<span><span>For</span><span>mat</span><span>ted</span></span>␊
+␣␣<div>␊
+␣␣␣␣<div>For</div>␊
+␣␣␣␣<div>mat</div>␊
+␣␣␣␣<div>ted</div>␊
+␣␣</div>␊
+</div>
\ No newline at end of file

```
</details>
</details>
<details><summary><strong>🔧 `"none"`</strong></summary>
Using [JS-Beautify](/docs/beautifier-js-beautify.html) beautifier:
```HTML
<div>
  <h1>Unformatted</h1>
  <div>
    <span>Un<span>formatted</span></span>
  </div>
  <span><span>For</span><span>mat</span><span>ted</span></span>
  <div>
    <div>For</div>
    <div>mat</div>
    <div>ted</div>
  </div>
</div>
```
<details><summary>Configuration</summary>
A `.unibeautify.json` file would look like the following:
```json
{
  "HTML": {
    "indent_size": 2,
    "indent_char": " ",
    "brace_style": "none"
  }
}
```
</details>
<details><summary>Difference from original</summary>
```diff
Index: none
===================================================================
--- none	Original
+++ none	Beautified
@@ -1,8 +1,12 @@
 <div>␊
-<h1>Unformatted</h1>␊
-<div>␊
-<span>Un<span>formatted</span></span>␊
-</div>␊
-<span><span>For</span><span>mat</span><span>ted</span></span>␊
-<div><div>For</div><div>mat</div><div>ted</div></div>␊
-</div>␊
+␣␣<h1>Unformatted</h1>␊
+␣␣<div>␊
+␣␣␣␣<span>Un<span>formatted</span></span>␊
+␣␣</div>␊
+␣␣<span><span>For</span><span>mat</span><span>ted</span></span>␊
+␣␣<div>␊
+␣␣␣␣<div>For</div>␊
+␣␣␣␣<div>mat</div>␊
+␣␣␣␣<div>ted</div>␊
+␣␣</div>␊
+</div>
\ No newline at end of file

```
</details>
</details>