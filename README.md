# convert-string-time [![Build Status](https://github.com/ahmedelgabri/convert-string-time/actions/workflows/build.yml/badge.svg)](https://github.com/ahmedelgabri/convert-string-time/actions/workflows/build.yml) [![](https://badgen.net/bundlephobia/minzip/convert-string-time)](https://bundlephobia.com/result?p=convert-string-time)

Convert time strings between 12/24 hours formats

# Usage

```bash
$ npm install convert-string-time

# or

$ yarn add convert-string-time
```

```ts
import {to24Hours, to12Hours} from 'convert-string-time'

console.log(to24Hours('09:23 am')) // 21:23
console.log(to12Hours('23:13')) // 11:13 PM
```

### Contribution

#### Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder. The package is optimized and bundled
with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests
related to files changed since the last commit.

## Author

- [Ahmed El Gabri](https://twitter.com/ahmedelgabri)
