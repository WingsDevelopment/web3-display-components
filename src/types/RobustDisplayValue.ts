export interface RobustDisplayValue<T> {
  value?: T | null
  warnings?: string[] | null
  errors?: string[] | null
}
