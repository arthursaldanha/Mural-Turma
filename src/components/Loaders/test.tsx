import { render, screen } from '@testing-library/react'

import Loaders from '.'

describe('<Loaders />', () => {
  it('should render the heading', () => {
    render(<Loaders />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
