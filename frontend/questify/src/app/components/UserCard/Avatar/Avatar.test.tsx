import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

jest.mock('next/image', () => (props: any) => {
  return <img {...props} />
})

describe('Avatar component', () => {
  it('always renders base avatar', () => {
    render(<Avatar />)

    const baseAvatar = screen.getByAltText('User avatar')
    expect(baseAvatar).toBeInTheDocument()
    expect(baseAvatar).toHaveAttribute('src', '/avatar/avatar.png')
  })

  it('renders background if background_id is provided', () => {
    render(<Avatar avatar={{ background_id: 2 }} />)
    expect(screen.getByAltText('User avatar background')).toHaveAttribute(
      'src',
      '/avatar/backgrounds/background2.png'
    )
  })

  it('renders glasses if glasses_id is provided', () => {
    render(<Avatar avatar={{ glasses_id: 3 }} />)
    expect(screen.getByAltText('User avatar glasses')).toHaveAttribute(
      'src',
      '/avatar/glasses/glasses3.png'
    )
  })

  it('renders hat if hat_id is provided', () => {
    render(<Avatar avatar={{ hat_id: 1 }} />)
    expect(screen.getByAltText('User avatar hat')).toHaveAttribute(
      'src',
      '/avatar/hats/hat1.png'
    )
  })

  it('renders frame if frame_id is provided', () => {
    render(<Avatar avatar={{ frame_id: 4 }} />)
    expect(screen.getByAltText('User avatar frame')).toHaveAttribute(
      'src',
      '/avatar/frames/frame4.png'
    )
  })

  it('renders all layers if all IDs are provided', () => {
    render(
      <Avatar
        avatar={{
          background_id: 1,
          glasses_id: 2,
          hat_id: 3,
          frame_id: 4,
        }}
      />
    )

    expect(screen.getByAltText('User avatar')).toBeInTheDocument()
    expect(screen.getByAltText('User avatar background')).toBeInTheDocument()
    expect(screen.getByAltText('User avatar glasses')).toBeInTheDocument()
    expect(screen.getByAltText('User avatar hat')).toBeInTheDocument()
    expect(screen.getByAltText('User avatar frame')).toBeInTheDocument()
  })
})
