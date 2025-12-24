import {defineConfig} from 'rolldown'

export default defineConfig({
  input: 'index.ts',
  output: [
    {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'index.cjs.js',
      minify: true,
    },
    {
      format: 'esm',
      dir: 'dist',
      entryFileNames: 'index.esm.js',
      minify: true,
    },
  ],
  external: [],
})
