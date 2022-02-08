import { render, screen } from '@testing-library/react'

import { Container } from '.'

describe('<Container />', () => {
  it('should render container', () => {
    render(<Container>Teste</Container>)

    expect(screen.getByText(/teste/i)).toBeInTheDocument()
  })

  it('should render container with flex-direction passing by props', () => {
    render(<Container flexDirection="column">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      flexDirection: 'column'
    })
  })

  it('should render container with justify-content passing by props', () => {
    render(<Container justifyContent="space-between">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      justifyContent: 'space-between'
    })
  })

  it('should render container with align-items passing by props', () => {
    render(<Container alignItems="center">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      alignItems: 'center'
    })
  })

  it('should render container with flex-wrap passing by props', () => {
    render(<Container flexWrap="wrap-reverse">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      flexWrap: 'wrap-reverse'
    })
  })

  it('should render container with align-content passing by props', () => {
    render(<Container alignContent="space-around">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      alignContent: 'space-around'
    })
  })

  it('should render container with align-self passing by props', () => {
    render(<Container alignSelf="flex-start">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      alignSelf: 'flex-start'
    })
  })

  it('should render container with background-color passing by props', () => {
    render(<Container backgroundColor="#fff">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      backgroundColor: '#fff'
    })
  })

  it('should render container with position passing by props', () => {
    render(<Container position="absolute">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      position: 'absolute'
    })
  })

  it('should render container with padding passing by props', () => {
    render(<Container padding="10px 100px 16px 2px">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      padding: '10px 100px 16px 2px'
    })
  })

  it('should render container with border-radius passing by props', () => {
    render(<Container borderRadius="50%">Teste</Container>)

    expect(screen.getByText(/teste/i)).toHaveStyle({
      borderRadius: '50%'
    })
  })
})
