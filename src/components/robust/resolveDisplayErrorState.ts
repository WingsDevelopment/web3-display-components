import type { QueryResponse } from "../../types/QueryResponse.js"
import type { RobustDisplayValue } from "../../types/RobustDisplayValue.js"

export type ResolvedDisplayErrorSeverity = "none" | "warning" | "error"

export interface ResolvedDisplayErrorState {
  isError: boolean
  displayErrorAndValue: boolean
  error: unknown
  errorMessage?: string
  severity: ResolvedDisplayErrorSeverity
}

export type DisplayErrorStateProps = Omit<ResolvedDisplayErrorState, "severity">

export function dedupeNonEmptyLines(lines: Array<string | undefined>): string[] {
  return Array.from(
    new Set(
      lines
        .map((line) => line?.trim())
        .filter((line): line is string => Boolean(line && line.length > 0)),
    ),
  )
}

export function buildDiagnosticsSectionMessage({
  errors,
  warnings,
}: {
  errors?: string[] | null
  warnings?: string[] | null
}): string | undefined {
  const uniqueErrors = dedupeNonEmptyLines(errors ?? [])
  const uniqueWarnings = dedupeNonEmptyLines(warnings ?? [])
  const lines: string[] = []

  if (uniqueErrors.length > 0) {
    lines.push("Errors:")
    lines.push(...uniqueErrors.map((line) => `- ${line}`))
  }

  if (uniqueWarnings.length > 0) {
    lines.push("Warnings:")
    lines.push(...uniqueWarnings.map((line) => `- ${line}`))
  }

  return lines.length > 0 ? lines.join("\n") : undefined
}

/**
 * Resolves robust property diagnostics + query state into DisplayValue error props.
 * - hard errors: icon only
 * - warnings with value: value + icon
 */
export function resolveDisplayErrorState<T>(
  queryState?: QueryResponse,
  property?: RobustDisplayValue<T>,
): ResolvedDisplayErrorState {
  const warningLines = dedupeNonEmptyLines(property?.warnings ?? [])
  const errorLines = dedupeNonEmptyLines(property?.errors ?? [])

  const propertyHasWarning = warningLines.length > 0
  const propertyHasHardError = errorLines.length > 0
  const propertyHasAnyError = propertyHasWarning || propertyHasHardError

  const queryErrorMessage =
    queryState?.error instanceof Error
      ? queryState.error.message
      : typeof queryState?.error === "string"
      ? queryState.error
      : undefined

  const diagnosticsSectionMessage = buildDiagnosticsSectionMessage({
    errors: property?.errors,
    warnings: property?.warnings,
  })

  const severity: ResolvedDisplayErrorSeverity = queryState?.isError
    ? "error"
    : propertyHasHardError
    ? "error"
    : propertyHasWarning
    ? "warning"
    : "none"

  const hasQueryError = Boolean(queryState?.isError)
  const queryErrorMessageLines = dedupeNonEmptyLines([
    queryState?.errorMessage,
    queryErrorMessage,
  ])
  const combinedErrorMessageLines = hasQueryError
    ? queryErrorMessageLines
    : dedupeNonEmptyLines([
        diagnosticsSectionMessage,
        ...queryErrorMessageLines,
      ])
  const fallbackErrorMessage = hasQueryError
    ? queryErrorMessageLines[0]
    : diagnosticsSectionMessage

  return {
    isError: Boolean(queryState?.isError || propertyHasAnyError),
    displayErrorAndValue: Boolean(
      !queryState?.isError &&
        !propertyHasHardError &&
        propertyHasWarning &&
        property?.value != null,
    ),
    error:
      queryState?.error ??
      (queryState?.isError || propertyHasAnyError
        ? { message: fallbackErrorMessage ?? "Unknown error" }
        : undefined),
    errorMessage:
      combinedErrorMessageLines.length > 0 ? combinedErrorMessageLines.join("\n") : undefined,
    severity,
  }
}

export function stripDisplayErrorSeverity(
  state: ResolvedDisplayErrorState,
): DisplayErrorStateProps {
  const { severity: _severity, ...rest } = state
  return rest
}
