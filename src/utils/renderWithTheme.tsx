import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles'

type RenderWithThemeProps = {
  children: ReactNode
}

export const RenderWithTheme: React.FC<RenderWithThemeProps> = ({
  children
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
