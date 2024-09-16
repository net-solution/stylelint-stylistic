# max-empty-lines

Limit the number of adjacent empty lines.

```css
a {}
     /* ← */
     /* ← */
a {} /* ↑ */
/**     ↑
 * These lines */
```

The [`fix` option](https://stylelint.io/user-guide/options#fix) can automatically fix all of the problems reported by this rule.

The [`message` secondary option](https://stylelint.io/user-guide/configure/#message) can accept the arguments of this rule.

## Options

`int`: Maximum number of adjacent empty lines allowed.

For example, with `2`:

The following patterns are considered problems:

```css
a {}



b {}
```

Comment strings are also checked -- so the following is a problem:

```css
/*
 Call me Ishmael.



 Some years ago--never mind how long precisely-—...
 */
```

The following patterns are _not_ considered problems:

```css
a {}
b {}
```

```css
a {}

b {}
```

```css
a {}


b {}
```

## Optional secondary options

### `ignore: ["comments"]`

Only enforce the adjacent empty lines limit for lines that are not comments.

For example, with `2` adjacent empty lines:

The following patterns are considered problems:

```css
/* horse */
a {}



b {}
```

The following patterns are _not_ considered problems:

```css
/*
 Call me Ishmael.



 Some years ago -- never mind how long precisely -- ...
 */
```

```css
a {
    /*
     Comment




     inside the declaration with a lot of empty lines...
    */
     color: pink;
}
```
