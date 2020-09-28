# css-grid-template-parser

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/glweems/css-grid-template-parser.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/glweems/css-grid-template-parser.svg)](https://travis-ci.org/alexjoverm/typescript-library-starter)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/glweems/css-grid-template-parser)

A simple CSS Grid template parser

## Installation

```
npm install --save css-grid-template-parser
```

## Basic usage

### Parse a grid template

```js
import { grid } from 'css-grid-template-parser';

const areas = grid(`
  "a a a b b"
  "a a a b b"
  ". . c c c"
  "d d d d d"
`);

// → {
//   width: 5,
//   height: 4,
//   areas: {
//     a: {
//       column: {start: 1, end: 4, span: 3},
//       row: {start: 1, end: 3, span: 2},
//     },
//     b: {
//       column: {start: 4, end: 6, span: 2},
//       row: {start: 1, end: 3, span: 2},
//     },
//     c: {
//       column: {start: 3, end: 6, span: 3},
//       row: {start: 3, end: 4, span: 1},
//     },
//     d: {
//       column: {start: 1, end: 6, span: 5},
//       row: {start: 4, end: 5, span: 1},
//     },
//   },
// }
```

### Build a grid template

```js
import { template } from 'css-grid-template-parser';

const areas = template({
  width: 5,
  height: 4,
  areas: {
    a: {
      column: { start: 1, end: 4, span: 3 },
      row: { start: 1, end: 3, span: 2 },
    },
    b: {
      column: { start: 3, end: 6, span: 3 },
      row: { start: 3, end: 5, span: 2 },
    },
  },
});

// → `"a a a . ."
//    "a a a . ."
//    ". . b b b"
//    ". . b b b"`
```

An helper is provided to declare areas more intuitively. The following example is equivalent to the previous:

```js
import { template, area } from 'css-grid-template-parser';

const a = area({
  x: 0,
  y: 0,
  width: 3,
  height: 2,
});

const b = area({
  x: 2,
  y: 2,
  width: 3,
  height: 2,
});

const areas = template({
  width: 5,
  height: 4,
  areas: { a, b },
});

// → `"a a a . ."
//    "a a a . ."
//    ". . b b b"
//    ". . b b b"`
```

## API

### `grid(template)`

Parses a grid template and returns an object representation.

#### Arguments

1. `template` _string_ The grid template to parse.

#### Returns

_[Grid](#grid)_ An object representation of the grid template.

#### Example

```js
import { grid } from 'css-grid-template-parser';

const areas = grid(`
  "a a a b b"
  "a a a b b"
  ". . c c c"
  "d d d d d"
`);

// → {
//   width: 5,
//   height: 4,
//   areas: {
//     a: {
//       column: {start: 1, end: 4, span: 3},
//       row: {start: 1, end: 3, span: 2},
//     },
//     b: {
//       column: {start: 4, end: 6, span: 2},
//       row: {start: 1, end: 3, span: 2},
//     },
//     c: {
//       column: {start: 3, end: 6, span: 3},
//       row: {start: 3, end: 4, span: 1},
//     },
//     d: {
//       column: {start: 1, end: 6, span: 5},
//       row: {start: 4, end: 5, span: 1},
//     },
//   },
// }
```

---

### `template(grid)`

Builds a grid template from an object representation.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to build.

#### Returns

_string_ The equivalent grid template.

#### Example

```js
import { template } from 'css-grid-template-parser';

const areas = template({
  width: 5,
  height: 4,
  areas: {
    a: {
      column: { start: 1, end: 4, span: 3 },
      row: { start: 1, end: 3, span: 2 },
    },
    b: {
      column: { start: 3, end: 6, span: 3 },
      row: { start: 3, end: 5, span: 2 },
    },
  },
});

// → `"a a a . ."
//    "a a a . ."
//    ". . b b b"
//    ". . b b b"`
```

---

### `rect(area)`

Converts an area into a rect.

#### Arguments

1. `area` _[Area](#area)_ The area to convert.

#### Returns

_[Rect](#rect)_ The equivalent rect.

#### Example

```js
import { rect } from 'css-grid-template-parser';

const r = rect({
  column: { start: 1, end: 4, span: 3 },
  row: { start: 1, end: 3, span: 2 },
});

// → {
//     x: 0,
//     y: 0,
//     width: 3,
//     height: 2,
//   }
```

---

### `area(rect)`

Converts a rect into an area.

#### Arguments

1. `rect` _[Rect](#rect)_ The rect to convert.

#### Returns

_[Area](#area)_ The equivalent area.

#### Example

```js
import { area } from 'css-grid-template-parser';

const a = area({
  x: 0,
  y: 0,
  width: 3,
  height: 2,
});

// → {
//     column: {start: 1, end: 4, span: 3},
//     row: {start: 1, end: 3, span: 2},
//   }
```

---

### `minColumnStart(grid)`

Finds the min column start of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The min column start.

#### Example

```js
import { grid, minColumnStart } from 'css-grid-template-parser';

const min = minColumnStart(
  grid(`
  ". . a a a"
  ". b b b b"
  ". . . c c"
`)
);

// → 2
```

---

### `maxColumnStart(grid)`

Finds the max column start of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The max column start.

#### Example

```js
import { grid, maxColumnStart } from 'css-grid-template-parser';

const max = maxColumnStart(
  grid(`
  ". . a a a"
  ". b b b b"
  ". . . c c"
`)
);

// → 4
```

---

### `minColumnEnd(grid)`

Finds the min column end of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The min column end.

#### Example

```js
import { grid, minColumnEnd } from 'css-grid-template-parser';

const min = minColumnEnd(
  grid(`
  "a a . . ."
  "b b b b ."
  "c c c . ."
`)
);

// → 3
```

---

### `maxColumnEnd(grid)`

Finds the max column end of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The max column end.

#### Example

```js
import { grid, maxColumnEnd } from 'css-grid-template-parser';

const max = maxColumnEnd(
  grid(`
  "a a . . ."
  "b b b b ."
  "c c c . ."
`)
);

// → 5
```

---

### `minRowStart(grid)`

Finds the min row start of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The min row start.

#### Example

```js
import { grid, minRowStart } from 'css-grid-template-parser';

const min = minRowStart(
  grid(`
  ". . . ."
  "a a . ."
  "a a b b"
  "a a b b"
`)
);

// → 2
```

---

### `maxRowStart(grid)`

Finds the max row start of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The max row start.

#### Example

```js
import { grid, maxRowStart } from 'css-grid-template-parser';

const max = maxRowStart(
  grid(`
  ". . . ."
  "a a . ."
  "a a b b"
  "a a b b"
`)
);

// → 3
```

---

### `minRowEnd(grid)`

Finds the min row end of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The min row end.

#### Example

```js
import { grid, minRowEnd } from 'css-grid-template-parser';

const min = minRowEnd(
  grid(`
  "a a b b"
  "a a b b"
  ". . b b"
  ". . . ."
`)
);

// → 3
```

---

### `maxRowEnd(grid)`

Finds the max row end of all grid areas.

#### Arguments

1. `grid` _[Grid](#grid)_ The grid to analyze.

#### Returns

_number_ The max row end.

#### Example

```js
import { grid, maxRowEnd } from 'css-grid-template-parser';

const max = maxRowEnd(
  grid(`
  "a a b b"
  "a a b b"
  ". . b b"
  ". . . ."
`)
);

// → 4
```

## Types

### `Track`

```ts
export interface Track {
  start: number;
  end: number;
  span: number;
}
```

### `Area`

```ts
type Area = {
  row: Track;
  column: Track;
};
```

### `Rect`

```ts
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### `Grid`

```ts
export interface Grid {
  width: number;
  height: number;
  areas: Record<string, Area>;
}
```

## License

MIT
