import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackButton from '@/components/back-button/back-button'
import { useRouter } from 'next/navigation'

// Mock the useRouter hook and its implementation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('BackButton', () => {
  it('renders the Back button with the correct text', () => {
    render(<BackButton />)
    const buttonElement = screen.getByRole('button', { name: /back/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls router.back when the button is clicked', async () => {
    const router = { back: jest.fn() }
    ;(useRouter as jest.Mock).mockReturnValue(router)

    render(<BackButton />)
    const buttonElement = screen.getByRole('button', { name: /back/i })
    await userEvent.click(buttonElement)
    expect(router.back).toHaveBeenCalledTimes(1)
  })

  it('has the correct styles applied', () => {
    render(<BackButton />)
    const buttonElement = screen.getByRole('button', { name: /back/i })

    expect(buttonElement).toHaveClass(
      'm-2 mx-4 bg-gray-200 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
    )
  })
})