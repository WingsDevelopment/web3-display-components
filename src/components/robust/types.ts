import type { DisplayValueProps } from "../DisplayValue.js"
import type { QueryResponse } from "../../types/QueryResponse.js"
import type { RobustDisplayValue } from "../../types/RobustDisplayValue.js"

export type ManagedDisplayValuePropKeys =
  | "viewValue"
  | "isError"
  | "error"
  | "errorMessage"
  | "displayErrorAndValue"

export interface RobustDisplayProps extends Omit<DisplayValueProps, ManagedDisplayValuePropKeys> {
  queryState?: QueryResponse
  property?: RobustDisplayValue<unknown>
}
