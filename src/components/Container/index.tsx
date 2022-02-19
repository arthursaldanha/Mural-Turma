import { FunctionComponent } from 'react'
import { ContainerProps } from 'types'
import { ContainerComponent } from './styles'

const Container: FunctionComponent<ContainerProps> = ({
  children,
  ...props
}) => <ContainerComponent {...props}>{children}</ContainerComponent>

export default Container
