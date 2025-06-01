import { render, screen, within } from '@testing-library/react'
import AppNav from './AppNav'

jest.mock('next/image', () => (props: any) => <img {...props} />)

describe('AppNav', () => {
  it('renders all navigation links with correct text and href', () => {
    render(<AppNav />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)

    const expected = [
      { text: 'Dashboard', href: '/dashboard', alt: 'Dashboard', src: '/icons/dashboard.svg' },
      { text: 'Friends', href: '/friends', alt: 'Friends', src: '/icons/friends.svg' },
      { text: 'Customize', href: '/customize', alt: 'Customize', src: '/icons/customize.svg' },
      { text: 'Settings', href: '/settings', alt: 'Settings', src: '/icons/settings.svg' },
    ]

    links.forEach((link, index) => {
      const { text, href, alt, src } = expected[index]

      expect(link).toHaveAttribute('href', href)
      expect(within(link).getByText(text)).toBeInTheDocument()
      expect(within(link).getByAltText(alt)).toHaveAttribute('src', src)
    })
  })
})
