import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Nav from "../Nav"
import { AuthProvider } from "@/context/AuthContext"
import { AppRouterContextProviderMock } from "@/__mocks__/AppRouterContextProviderMock"
import userEvent from "@testing-library/user-event"

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(() => {}),
	onAuthStateChanged: jest.fn((auth, fn) => {
		fn(null)
	})
}))

function renderNav() {
	const push = jest.fn() // simulates router behavior
	return render(
		<AppRouterContextProviderMock router={{ push }}>
			<AuthProvider>
				<Nav />
			</AuthProvider>
		</AppRouterContextProviderMock>
	)
}

describe("Nav", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	describe("Render", () => {
		it("should render a home link in both desktop and mobile nav", () => {
			renderNav()
			const homeLinks = screen.getAllByRole("link", {
				name: /home/i
			})
			homeLinks.forEach((homeLink) => {
				expect(homeLink).toBeInTheDocument()
			})
		})

		it("should render an about link in both desktop and mobile nav", () => {
			renderNav()
			const aboutLinks = screen.getAllByRole("link", {
				name: /about/i
			})
			aboutLinks.forEach((aboutLink) => {
				expect(aboutLink).toBeInTheDocument()
			})
		})
	})
})
