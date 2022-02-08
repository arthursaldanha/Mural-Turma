import React from 'react'
import { TextProps } from 'types'
import { TextComponent } from './styles'

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <TextComponent {...props}>{children}</TextComponent>
}
