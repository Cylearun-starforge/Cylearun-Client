# built

Codes in this package will be packed into client. We use this package to implement [Two package.json structure](https://www.electron.build/tutorials/two-package-structure).

## Prerequisite

Before running or packing, build `apps/client`, `packages/renderer`, `packages/preload` and move those codes into `code` folder. To do this, run the following command:
``` powershell
pnpm compose-build
```
