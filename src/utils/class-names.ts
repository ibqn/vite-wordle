import { type ComponentProps } from 'preact'

export type ClassName =
  | boolean
  | Pick<ComponentProps<'div'>, 'className'>['className']

export const classNames = (...classes: ClassName[]) =>
  classes.filter(Boolean).join(' ')
