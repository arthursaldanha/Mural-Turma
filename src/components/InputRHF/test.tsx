import { render, screen } from '@testing-library/react'
import { RenderWithTheme } from 'utils/renderWithTheme'

describe('<InputRHF />', () => {
  it('should render the input', () => {
    render(
      <RenderWithTheme>
        <div data-testid="input">Teste</div>
      </RenderWithTheme>
    )

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })
})
