import { render, screen } from '@testing-library/react'
import { RenderWithTheme } from 'utils/renderWithTheme'
import { Input } from '.'

describe('<Input />', () => {
  it('should render the input', () => {
    render(
      <RenderWithTheme>
        <Input />
      </RenderWithTheme>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
