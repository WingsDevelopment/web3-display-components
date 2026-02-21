import type { ReactNode } from "react"
import type { DisplayValueProps } from "../DisplayValue.js"

type PropertyDisplayProps = Pick<
  DisplayValueProps,
  | "viewValue"
  | "fallbackViewValue"
  | "symbol"
  | "sign"
  | "belowMin"
  | "aboveMax"
  | "indicator"
  | "prefix"
>

function toDisplayText(value: unknown): string {
  return typeof value === "string" ? value : String(value)
}

export function resolvePropertyDisplayProps(value: unknown): Partial<PropertyDisplayProps> {
  if (value == null) {
    return {}
  }

  if (typeof value !== "object") {
    return { viewValue: toDisplayText(value) }
  }

  const data = value as Record<string, unknown>
  const next: Partial<PropertyDisplayProps> = {}

  if ("viewValue" in data) {
    next.viewValue = data.viewValue == null ? null : toDisplayText(data.viewValue)
  } else if ("value" in data && data.value != null) {
    next.viewValue = toDisplayText(data.value)
  }

  if ("fallbackViewValue" in data) {
    next.fallbackViewValue =
      data.fallbackViewValue == null ? null : toDisplayText(data.fallbackViewValue)
  }

  if ("symbol" in data) {
    next.symbol = data.symbol == null ? null : toDisplayText(data.symbol)
  }

  if ("sign" in data) {
    next.sign = data.sign == null ? undefined : toDisplayText(data.sign)
  }

  if (typeof data.belowMin === "boolean") {
    next.belowMin = data.belowMin
  }

  if (typeof data.aboveMax === "boolean") {
    next.aboveMax = data.aboveMax
  }

  if ("indicator" in data) {
    next.indicator = data.indicator as ReactNode
  }

  if ("prefix" in data) {
    next.prefix = data.prefix as ReactNode
  }

  return next
}
