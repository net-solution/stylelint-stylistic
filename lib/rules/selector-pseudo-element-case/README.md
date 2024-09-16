# selector-pseudo-element-case

Specify lowercase or uppercase for pseudo-element selectors.

```css
  a::before {}
/**  ↑
 * This pseudo-element selector */
```

The [`fix` option](https://stylelint.io/user-guide/options#fix) can automatically fix all of the problems reported by this rule.

The [`message` secondary option](https://stylelint.io/user-guide/configure/#message) can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a:Before {}
```

```css
a:bEfOrE {}
```

```css
a:BEFORE {}
```

```css
a::Before {}
```

```css
a::bEfOrE {}
```

```css
a::BEFORE {}
```

```css
input::-MOZ-PLACEHOLDER {}
```

The following patterns are _not_ considered problems:

```css
a:before {}
```

```css
a::before {}
```

```css
input::-moz-placeholder {}
```

### `"upper"`

The following patterns are considered problems:

```css
a:Before {}
```

```css
a:bEfOrE {}
```

```css
a:BEFORE {}
```

```css
a::Before {}
```

```css
a::bEfOrE {}
```

```css
a::before {}
```

```css
input::-moz-placeholder {}
```

The following patterns are _not_ considered problems:

```css
a:BEFORE {}
```

```css
a::BEFORE {}
```

```css
input::-MOZ-PLACEHOLDER {}
```
