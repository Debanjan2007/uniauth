# Installation

Get started with `@deba_1307/uniauth` by adding it to your project.

## Prerequisites

UniAuth requires **Node.js >= 20**.

## Install

You can install UniAuth using your preferred package manager:

### npm
```bash
npm install @deba_1307/uniauth
```

### pnpm
```bash
pnpm add @deba_1307/uniauth
```

### yarn
```bash
yarn add @deba_1307/uniauth
```

## Import Usage

UniAuth is built with tsup and supports both **ES Modules (ESM)** and **CommonJS (CJS)**.

### ES Modules (ESM)
```typescript
import Uniauth, { ExtractKey } from '@deba_1307/uniauth';
// or
import { Uniauth, ExtractKey } from '@deba_1307/uniauth';
```

### CommonJS
```javascript
const { Uniauth, ExtractKey } = require('@deba_1307/uniauth');
```

## TypeScript Support

UniAuth is written in TypeScript and ships with its own type definitions. You don't need to install any `@types/` packages. All types and interfaces are available out of the box via `dist/index.d.ts`.
