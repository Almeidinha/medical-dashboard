import React from 'react'
import { render, screen } from '@testing-library/react'
import Card, { CardProps } from '@/components/card'

describe('Card', () => {
  const renderCard = (props: CardProps = {}) => render(<Card {...props} />)

  it('renders the Card component', () => {
    renderCard()
    const cardElement = screen.getByRole('article')
    expect(cardElement).toBeInTheDocument()
  })

  it('renders with the provided title', () => {
    const title = 'Card Title'
    renderCard({ title })
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('renders with the provided header', () => {
    const header = 'Card Header'
    renderCard({ header })
    const headerElement = screen.getByText(header)
    expect(headerElement).toBeInTheDocument()
  })

  it('renders with the provided footer', () => {
    const footer = <div>Card Footer</div>
    renderCard({ footer })
    const footerElement = screen.getByText('Card Footer')
    expect(footerElement).toBeInTheDocument()
  })

  it('applies custom classes passed via className prop', () => {
    const className = 'custom-class'
    renderCard({ className })
    const cardElement = screen.getByRole('article')
    expect(cardElement).toHaveClass(className)
  })

  it('renders correctly without header, title, or footer', () => {
    renderCard()
    const cardElement = screen.getByRole('article')
    expect(cardElement).toBeInTheDocument()

    // Check that optional elements are not rendered
    expect(screen.queryByText(/Card Header/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Card Title/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Card Footer/i)).not.toBeInTheDocument()
  })
})