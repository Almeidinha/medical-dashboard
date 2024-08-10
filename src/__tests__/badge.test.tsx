import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    const badgeElement = screen.getByText('Test Badge')
    expect(badgeElement).toBeInTheDocument()
  })

  it('applies default neutral class when no specific type is provided', () => {
    render(<Badge>Test Badge</Badge>)
    const badgeElement = screen.getByText('Test Badge')
    expect(badgeElement).toHaveClass('bg-gray-200')
  })

  it('applies info class when info prop is provided', () => {
    render(<Badge info>Info Badge</Badge>)
    const badgeElement = screen.getByText('Info Badge')
    expect(badgeElement).toHaveClass('bg-blue-200')
  })

  it('applies success class when success prop is provided', () => {
    render(<Badge success>Success Badge</Badge>)
    const badgeElement = screen.getByText('Success Badge')
    expect(badgeElement).toHaveClass('bg-green-200')
  })

  it('applies warning class when warning prop is provided', () => {
    render(<Badge warning>Warning Badge</Badge>)
    const badgeElement = screen.getByText('Warning Badge')
    expect(badgeElement).toHaveClass('bg-yellow-200')
  })

  it('applies critical class when critical prop is provided', () => {
    render(<Badge critical>Critical Badge</Badge>)
    const badgeElement = screen.getByText('Critical Badge')
    expect(badgeElement).toHaveClass('bg-red-200')
  })

  it('applies additional custom classes when className prop is provided', () => {
    render(<Badge className="custom-class">Custom Class Badge</Badge>)
    const badgeElement = screen.getByText('Custom Class Badge')
    expect(badgeElement).toHaveClass('custom-class')
  })

  it('combines default padding and color classes with additional custom classes', () => {
    render(<Badge info className="custom-class">Combined Class Badge</Badge>)
    const badgeElement = screen.getByText('Combined Class Badge')
    expect(badgeElement).toHaveClass('px-2 py-1 bg-blue-200 custom-class')
  })
})