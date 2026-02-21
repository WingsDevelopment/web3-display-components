import * as React from "react"
import { DisplayPercentage } from "../DisplayPercentage.js"
import {
  resolveDisplayErrorState,
  stripDisplayErrorSeverity,
} from "./resolveDisplayErrorState.js"
import { resolvePropertyDisplayProps } from "./resolvePropertyDisplayProps.js"
import type { RobustDisplayProps } from "./types.js"

export type DisplayPercentRobustProps = RobustDisplayProps

export function DisplayPercentRobust({
  queryState,
  property,
  ...props
}: DisplayPercentRobustProps) {
  const resolvedErrorState = stripDisplayErrorSeverity(
    resolveDisplayErrorState(queryState, property),
  )

  return (
    <DisplayPercentage
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...resolvePropertyDisplayProps(property?.value)}
    />
  )
}

export const DisplayPercentageRobust = DisplayPercentRobust
