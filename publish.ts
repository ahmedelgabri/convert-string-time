#!/usr/bin/env bun

const versionType = Bun.argv[2]
const otp = Bun.argv[3]

if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Usage: bun run publish.ts <patch|minor|major> [otp]')
  process.exit(1)
}

// Bump version
await Bun.$`bunx npm version ${versionType}`
// await Bun.$`bun publish --auth-type legacy` // not working

// Publish to npm
if (otp) {
  await Bun.$`bunx npm publish --access public --otp ${otp}`
} else {
  await Bun.$`bunx npm publish --access public`
}

// Push to git with tags
await Bun.$`git push --follow-tags`

export {}
