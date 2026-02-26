# web3-display-components

Use this skill when integrating or refactoring UI rendering with `web3-display-components`.

## Scope

This skill covers display-layer usage only:

- `DisplayValue`
- `DisplayTokenAmount`
- `DisplayTokenValue`
- `DisplayPercentage`
- robust wrappers in `components/robust`

Formatting and runtime normalization should be handled by `web3-robust-formatting`.

## Install

```bash
npm install web3-display-components
```

Recommended pair:

```bash
npm install web3-robust-formatting
```

## Core intent

- Keep rendering concerns separate from formatting concerns.
- Render values consistently across loading, empty, warning, and error states.
- Prefer robust wrappers when upstream data includes diagnostics.

## Component selection

- `DisplayValue`
  - Base renderer for value + symbol + indicator + loading/error/empty behavior.
- `DisplayTokenAmount`
  - Token amount presentation (`symbolPosition="after"` default).
- `DisplayTokenValue`
  - Fiat/token value presentation (`symbol="$"`, `symbolPosition="before"` default).
- `DisplayPercentage`
  - Percentage presentation (`symbol="%"`, `symbolPosition="after"` default).

## Robust wrappers

Use robust wrappers when your data shape includes `{ value, warnings, errors }`:

- `DisplayValueRobust`
- `DisplayTokenAmountRobust`
- `DisplayTokenValueRobust`
- `DisplayPercentRobust`

Aliases also exported for compatibility:

- `DisplayValueField`
- `DisplayTokenAmountField`, `DisplayTokenAmountValue`
- `DisplayTokenValueField`, `DisplayTokenValueValue`
- `DisplayPercentValue`, `DisplayPercentageRobust`, `DisplayPercentageValue`

## Robust error resolution behavior

Use `resolveDisplayErrorState` when you need explicit control:

- resolves severity: `none | warning | error`
- returns injected DisplayValue error props:
  - `isError`
  - `displayErrorAndValue`
  - `error`
  - `errorMessage`

Use `resolvePropertyDisplayProps` to map robust `property.value` into display props.

## Recommended integration pattern

```tsx
import {
  DisplayPercentRobust,
  type RobustDisplayValue,
} from "web3-display-components"
import { robustFormatPercentToViewPercent } from "web3-robust-formatting"

const robust = robustFormatPercentToViewPercent({
  input: { value: api?.ratio },
})

const property: RobustDisplayValue<unknown> = {
  value: robust.value,
  warnings: robust.warnings,
  errors: robust.errors,
}

return <DisplayPercentRobust property={property} />
```

## Custom icon/tooltip handling

This library does not force warning/error icon injection in robust wrappers.
Use resolver outputs with your own design system components:

```tsx
import {
  DisplayPercentage,
  resolveDisplayErrorState,
  resolvePropertyDisplayProps,
} from "web3-display-components"

const { severity, ...resolved } = resolveDisplayErrorState(queryState, property)
const ErrorIconComponent = severity === "warning" ? MyWarningIcon : MyErrorIcon

return (
  <DisplayPercentage
    {...queryState}
    {...resolved}
    ErrorIconComponent={ErrorIconComponent}
    {...resolvePropertyDisplayProps(property?.value)}
  />
)
```

## Tailwind setup reminder

Consumers must include package files in Tailwind scan paths to generate class names.

## Anti-patterns to avoid

- Do not move formatting logic into this package; keep it in `web3-robust-formatting`.
- Do not concatenate symbols into numeric strings unless required by downstream renderer.
- Do not ignore robust warnings/errors when rendering user-facing financial values.
- Do not hardcode warning/error icon policy in this library; inject at app level.

## Expected Codex behavior in this domain

When using this skill, Codex should:

- choose display primitives by semantic intent (token amount/value/percent)
- use robust wrappers when diagnostics exist
- preserve compatibility aliases during migrations
- keep resolver helpers pure and reusable
- update README exports and usage examples whenever public component APIs change
