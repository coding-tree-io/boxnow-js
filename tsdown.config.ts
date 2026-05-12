import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    dts: { eager: true },
    entry: ['packages/boxnow-core/src/index.ts'],
    outDir: 'packages/boxnow-core/dist',
  },
  {
    dts: { eager: true },
    entry: ['packages/boxnow/src/index.ts'],
    outDir: 'packages/boxnow/dist',
  },
  {
    dts: { eager: true },
    entry: ['packages/boxnow-widget/src/index.ts'],
    outDir: 'packages/boxnow-widget/dist',
  },
]);
