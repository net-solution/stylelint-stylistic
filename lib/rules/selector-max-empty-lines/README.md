# selector-max-empty-lines

Limit the number of adjacent empty lines within selectors.

```css
a,
              /* ← */
b {        /* ↑ */
  color: red; /* ↑ */
}             /* ↑ */
/**              ↑
 *        This empty line */
```

The [`fix` option](https://stylelint.io/user-guide/options#fix) can automatically fix all of the problems reported by this rule.

The [`message` secondary option](https://stylelint.io/user-guide/configure/#message) can accept the arguments of this rule.

## Options

`int`: Maximum number of adjacent empty lines allowed.

For example, with `0`:

The following patterns are considered problems:

```css
a

b {
  color: red;
}
```

```css
a,

b {
  color: red;
}
```

```css
a

>
b {
  color: red;
}
```

```css
a
>

b {
  color: red;
}
```

The following patterns are _not_ considered problems:

```css
a b {
  color: red;
}
```

```css
a
b {
  color: red;
}
```

```css
a,
b {
  color: red;
}
```

```css
a > b {
  color: red;
}
```

```css
a
>
b {
  color: red;
}
```
