---
to: packages/<%=name%>/package.json
sh: pnpm install
---
{
  "name": "@repo/<%=name%>",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@turbo/gen": "^2.4.0",
    "eslint": "^9.19.0",
    "typescript": "5.7.3"
  },
  "devDependencies": {}
}