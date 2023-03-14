export type ClassName = string | boolean | undefined

export const classNames = (...classes: ClassName[]) =>
  classes.filter(Boolean).join(' ')
