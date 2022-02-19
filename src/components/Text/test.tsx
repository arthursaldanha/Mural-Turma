import { render, screen } from '@testing-library/react'
import { RenderWithTheme } from 'utils/renderWithTheme'

import Text from '.'

describe('<Text />', () => {
  it('should render the Text Component in the document', () => {
    render(
      <RenderWithTheme>
        <Text fontFamily="Inter">Teste</Text>
      </RenderWithTheme>
    )
    expect(screen.getByText(/teste/i)).toBeInTheDocument()
  })

  it('should render the Text Component with font-family passed by props', () => {
    render(
      <RenderWithTheme>
        <Text fontFamily="Lexend">teste</Text>
      </RenderWithTheme>
    )
    expect(screen.getByText(/teste/i)).toHaveStyle({
      fontFamily: 'Lexend'
    })
  })

  it('should render the Text Component with font-weight passed by props', () => {
    render(
      <RenderWithTheme>
        <Text fontFamily="Inter" weight="regular">
          teste
        </Text>
      </RenderWithTheme>
    )
    expect(screen.getByText(/teste/i)).toHaveStyle({
      fontWeight: 400
    })
  })

  it('should render the Text Component with font-size passed by props', () => {
    render(
      <RenderWithTheme>
        <Text fontFamily="Inter" variant="xxxsmall">
          teste
        </Text>
      </RenderWithTheme>
    )
    expect(screen.getByText(/teste/i)).toHaveStyle({
      fontSize: '1rem'
    })
  })
})
