import * as React from "react"
import { DisplayTokenAmount } from "../DisplayTokenAmount.js"
import {
  resolveDisplayErrorState,
  stripDisplayErrorSeverity,
} from "./resolveDisplayErrorState.js"
import { resolvePropertyDisplayProps } from "./resolvePropertyDisplayProps.js"
import type { RobustDisplayProps } from "./types.js"

export type DisplayTokenAmountRobustProps = RobustDisplayProps

export function DisplayTokenAmountRobust({
  queryState,
  property,
  ...props
}: DisplayTokenAmountRobustProps) {
  const resolvedErrorState = stripDisplayErrorSeverity(
    resolveDisplayErrorState(queryState, property),
  )

  return (
    <DisplayTokenAmount
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...resolvePropertyDisplayProps(property?.value)}
    />
  )
}
