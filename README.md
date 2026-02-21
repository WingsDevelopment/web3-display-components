# web3-display-components

React UI components for rendering web3/finance values with consistent loading, empty, truncation, and error states.

- Display primitives: `DisplayValue`, `DisplayTokenAmount`, `DisplayTokenValue`, `DisplayPercentage`
- Robust wrappers: `DisplayValueRobust`, `DisplayTokenAmountRobust`, `DisplayTokenValueRobust`, `DisplayPercentRobust`
- Runtime diagnostics support: warnings/errors from robust formatting pipelines are surfaced out of the box
- Tailwind-ready default primitives with override points for tooltip, loader, truncate, skeleton, and icons

## Installation

```bash
npm install web3-display-components
```

Peer dependencies:

```json
{
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^3.0.0"
}
```

### Optional robust formatting package

Formatting utilities were moved to a dedicated package:

```bash
npm install web3-robust-formatting
```

Use `web3-robust-formatting` to produce robust values/warnings/errors, then pass them into wrappers from this package.

## Tailwind Setup

Tailwind v4:

```css
@source "../node_modules/web3-display-components/**/*.{js,ts,jsx,tsx}";
```

Tailwind v3:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/web3-display-components/**/*.{js,ts,jsx,tsx}",
  ],
}
```

## Quick Start

```tsx
import {
  DisplayPercentRobust,
  type RobustDisplayValue,
} from "web3-display-components"
import { robustFormatPercentToViewPercent } from "web3-robust-formatting"

export function PnlCell({ ratio }: { ratio: unknown }) {
  const robust = robustFormatPercentToViewPercent({
    input: { value: ratio },
  })

  const property: RobustDisplayValue<unknown> = {
    value: robust.value,
    warnings: robust.warnings,
    errors: robust.errors,
  }

  return <DisplayPercentRobust property={property} />
}
```

## Component Overview

### Display primitives

- `DisplayValue`: base renderer
- `DisplayTokenAmount`: defaults symbol position to `after`
- `DisplayTokenValue`: defaults symbol to `$`, position `before`
- `DisplayPercentage`: defaults symbol to `%`, position `after`

### Robust wrappers

- `DisplayValueRobust` (aliases: `DisplayValueField`)
- `DisplayTokenAmountRobust` (aliases: `DisplayTokenAmountField`, `DisplayTokenAmountValue`)
- `DisplayTokenValueRobust` (aliases: `DisplayTokenValueField`, `DisplayTokenValueValue`)
- `DisplayPercentRobust` (aliases: `DisplayPercentValue`, `DisplayPercentageRobust`, `DisplayPercentageValue`)

Each wrapper:

- accepts `queryState?: QueryResponse`
- accepts `property?: RobustDisplayValue<unknown>`
- resolves severity (`none | warning | error`)
- injects DisplayValue error props (`isError`, `displayErrorAndValue`, `error`, `errorMessage`)
- leaves warning/error icon selection to consumer-level component injection

## resolveDisplayErrorState

Use this utility directly when you need full control:

```tsx
import {
  DisplayPercentage,
  resolveDisplayErrorState,
  resolvePropertyDisplayProps,
} from "web3-display-components"

function CustomPercent({ queryState, property }: { queryState?: any; property?: any }) {
  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, property)
  const ErrorIconComponent = severity === "warning" ? MyWarningIcon : MyErrorIcon

  return (
    <DisplayPercentage
      {...queryState}
      ErrorIconComponent={ErrorIconComponent}
      {...resolvedErrorState}
      {...resolvePropertyDisplayProps(property?.value)}
    />
  )
}
```

## API Exports

```ts
// Core components
export * from "./components/DisplayValue.js"
export * from "./components/DisplayTokenAmount.js"
export * from "./components/DisplayTokenValue.js"
export * from "./components/DisplayPercentage.js"

// Robust wrappers + resolver helpers
export * from "./components/robust/index.js"

// Defaults
export * from "./components/defaults/DefaultComponents.js"
export * from "./components/defaults/Truncate.js"

// Types + utils
export * from "./types/QueryResponse.js"
export * from "./types/RobustDisplayValue.js"
export * from "./utils/tailwind.js"
```

## License

MIT
