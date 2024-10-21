import { ReactNode } from 'react'

export type ReactElementType = {
  children?: ReactNode
  className?: React.ComponentProps<'div'>['className']
}
