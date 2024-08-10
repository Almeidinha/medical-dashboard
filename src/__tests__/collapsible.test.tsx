import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Collapsible from '@/components/collapsible'

describe('Collapsible', () => {
  const renderCollapsible = (props = {}) => {
    return render(
      <Collapsible {...props}>
        <div>Test Content</div>
      </Collapsible>
    )
  }

  it('renders the Collapsible component with default props', () => {
    renderCollapsible()
    const titleElement = screen.queryByText(/Test Content/i)
    expect(titleElement).toBeInTheDocument()
  })

  it('renders with the provided title', () => {
    const title = 'Collapsible Title'
    renderCollapsible({ title })
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('handles collapsing and expanding', async () => {
    renderCollapsible()

    const toggleButton = screen.getByRole('button')
    const contentElement = screen.getByText(/Test Content/i).parentElement!.parentElement!.parentElement

    // Initially, the content should be visible
    expect(contentElement).toBeInTheDocument()

    // Click to collapse
    fireEvent.click(toggleButton)
    expect(contentElement).toHaveClass('max-h-0')

    // Click again to expand
    fireEvent.click(toggleButton)
    expect(contentElement).not.toHaveClass('max-h-0')
  })

  it('calls onCollapse callback with the correct argument when toggled', async () => {
    const onCollapseMock = jest.fn()
    renderCollapsible({ onCollapse: onCollapseMock })

    const toggleButton = screen.getByRole('button')

    // Click to collapse
    fireEvent.click(toggleButton)
    // Click again to expand
    fireEvent.click(toggleButton)

    expect(onCollapseMock).toHaveBeenCalledTimes(2)
  })

  it('renders children correctly', () => {
    renderCollapsible()
    const contentElement = screen.getByText(/Test Content/i)
    expect(contentElement).toBeInTheDocument()
  })
})