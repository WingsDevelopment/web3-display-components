import * as React from "react"
import { DisplayValue } from "../DisplayValue.js"
import {
  resolveDisplayErrorState,
  stripDisplayErrorSeverity,
} from "./resolveDisplayErrorState.js"
import { resolvePropertyDisplayProps } from "./resolvePropertyDisplayProps.js"
import type { RobustDisplayProps } from "./types.js"

export type DisplayValueRobustProps = RobustDisplayProps

export function DisplayValueRobust({
  queryState,
  property,
  ...props
}: DisplayValueRobustProps) {
  const resolvedErrorState = stripDisplayErrorSeverity(
    resolveDisplayErrorState(queryState, property),
  )

  return (
    <DisplayValue
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...resolvePropertyDisplayProps(property?.value)}
    />
  )
}
