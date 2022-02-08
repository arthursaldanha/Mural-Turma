import { FunctionComponent } from 'react'
import { ContainerProps } from 'types'
import { ContainerComponent } from './styles'

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  ...props
}) => <ContainerComponent {...props}>{children}</ContainerComponent>
