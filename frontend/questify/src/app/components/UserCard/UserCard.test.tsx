import { render, screen } from '@testing-library/react'
import UserCard from './UserCard'

jest.mock('./Avatar/Avatar', () => () => <div data-testid="avatar" />)

describe('UserCard', () => {

    it('renders user information correctly', () => {
        render(
            <UserCard
                user={{id: 1, name: "John Doe"}}
                avatar={{background_id: 1, glasses_id: 1, hat_id: 1, frame_id: 1}}
                stats={{exp: 125, coins: 300}} />
        )

        expect(screen.getByText("300 coins")).toBeInTheDocument()
        expect(screen.getByText("Level 12")).toBeInTheDocument()
        expect(screen.getByText("John Doe")).toBeInTheDocument()
        expect(screen.getByTestId('avatar')).toBeInTheDocument()

    })
    it('handles missing user', () => {
        render(
            <UserCard
                user={{id: 1}}
                stats={{}} />
        )

        expect(screen.getByText("0 coins")).toBeInTheDocument()
        expect(screen.getByText("Level 0")).toBeInTheDocument()
        expect(screen.getByText("User")).toBeInTheDocument()
        expect(screen.getByTestId('avatar')).toBeInTheDocument()
    })
})