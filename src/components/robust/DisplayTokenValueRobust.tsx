import * as React from "react"
import { DisplayTokenValue } from "../DisplayTokenValue.js"
import {
  resolveDisplayErrorState,
  stripDisplayErrorSeverity,
} from "./resolveDisplayErrorState.js"
import { resolvePropertyDisplayProps } from "./resolvePropertyDisplayProps.js"
import type { RobustDisplayProps } from "./types.js"

export type DisplayTokenValueRobustProps = RobustDisplayProps

export function DisplayTokenValueRobust({
  queryState,
  property,
  ...props
}: DisplayTokenValueRobustProps) {
  const resolvedErrorState = stripDisplayErrorSeverity(
    resolveDisplayErrorState(queryState, property),
  )

  return (
    <DisplayTokenValue
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...resolvePropertyDisplayProps(property?.value)}
    />
  )
}
