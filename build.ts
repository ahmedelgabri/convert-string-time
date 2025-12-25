#!/usr/bin/env bun

// Clean dist directory
await Bun.$`rm -rf dist`

// Build ESM
await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  format: 'esm',
  minify: true,
  naming: {
    entry: 'index.esm.js',
  },
})

// Build CJS
await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  format: 'cjs',
  minify: true,
  naming: {
    entry: 'index.cjs.js',
  },
})

// Generate TypeScript declaration files
await Bun.$`tsc --project tsconfig.build.json --emitDeclarationOnly`

export {}
