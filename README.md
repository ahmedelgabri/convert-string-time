# convert-string-time [![Build Status](https://github.com/ahmedelgabri/convert-string-time/actions/workflows/build.yml/badge.svg)](https://github.com/ahmedelgabri/convert-string-time/actions/workflows/build.yml) [![](https://badgen.net/bundlephobia/minzip/convert-string-time)](https://bundlephobia.com/result?p=convert-string-time)

Convert time strings between 12/24 hours formats

## Installation

```bash
npm install convert-string-time
# or
yarn add convert-string-time
# or
bun add convert-string-time
```

## API

### `to24Hours(timeString: string): string | null`

Converts a 12-hour time string to 24-hour format.

```ts
import {to24Hours} from 'convert-string-time'

to24Hours('09:23 am') // '09:23'
to24Hours('11:00 PM') // '23:00'
to24Hours('12:00 AM') // '00:00'
to24Hours('12:30 PM') // '12:30'
to24Hours('invalid') // null
```

### `to12Hours(timeString: string): string | null`

Converts a 24-hour time string to 12-hour format.

```ts
import {to12Hours} from 'convert-string-time'

to12Hours('23:13') // '11:13 PM'
to12Hours('09:00') // '09:00 AM'
to12Hours('00:00') // '12:00 AM'
to12Hours('12:00') // '12:00 PM'
to12Hours('invalid') // null
```

### `parseTime(timeString: string): ParsedTime`

Automatically detects the time format and returns both 12-hour and 24-hour representations.

```ts
import {parseTime} from 'convert-string-time'

parseTime('11:00 PM')
// { format: '12h', time12h: '11:00 PM', time24h: '23:00' }

parseTime('23:00')
// { format: '24h', time12h: '11:00 PM', time24h: '23:00' }

parseTime('invalid')
// { format: null, time12h: null, time24h: null }
```

### `isValidTimeFormat(timeString: string): boolean`

Validates if a time string is in a valid 12-hour or 24-hour format.

```ts
import {isValidTimeFormat} from 'convert-string-time'

isValidTimeFormat('23:00') // true
isValidTimeFormat('11:00 PM') // true
isValidTimeFormat('9:30 am') // true
isValidTimeFormat('25:00') // false
isValidTimeFormat('invalid') // false
```

### Contribution

#### Local Development

This project uses [Bun](https://bun.sh) for development. Below is a list of commands you will probably find useful.

### `bun test`

Runs the test suite using Bun's built-in test runner.

### `bun run build`

Bundles the package to the `dist` folder. The package is optimized and bundled into multiple formats (CommonJS and ES Module).

### `bun run lint`

Runs the linter to check for code quality issues.

### `bun run format`

Formats the code using Prettier.

## Author

- [Ahmed El Gabri](https://twitter.com/ahmedelgabri)
