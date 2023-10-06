import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import SignIn from "../SignIn"
import { AuthProvider } from "@/context/AuthContext"
import { AppRouterContextProviderMock } from "@/__mocks__/AppRouterContextProviderMock"
import userEvent from "@testing-library/user-event"
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth"

// const mockSignInWithEmailAndPassword = () => {
// 	return Promise.resolve(null)
// }

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(),
	signInWithEmailAndPassword: jest.fn(() => {
		return Promise.resolve(null)
	}),
	onAuthStateChanged: jest.fn((auth, fn) => {
		fn(null)
	})
}))

function renderSignIn() {
	const push = jest.fn() // simulates router behavior
	return render(
		<AppRouterContextProviderMock router={{ push }}>
			<AuthProvider>
				<SignIn />
			</AuthProvider>
		</AppRouterContextProviderMock>
	)
}

describe("SignIn", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe("Render", () => {
		it("should render an email label", async () => {
			renderSignIn()
			const emailLabel = await screen.findByLabelText(/email/i)
			expect(emailLabel).toBeInTheDocument()
		})

		it("should render an email input", async () => {
			renderSignIn()
			const emailInput = await screen.findByTestId("email-input")
			expect(emailInput).toBeInTheDocument()
			expect(emailInput).toHaveAttribute("type", "email")
		})

		it("should render a password label", async () => {
			renderSignIn()
			const passwordLabel = await screen.findByLabelText(/password/i)
			expect(passwordLabel).toBeInTheDocument()
		})

		it("should render a password input", async () => {
			renderSignIn()
			const passwordInput = await screen.findByTestId("password-input")
			expect(passwordInput).toBeInTheDocument()
			expect(passwordInput).toHaveAttribute("type", "password")
		})

		it("should render a log in button", async () => {
			renderSignIn()
			const loginButtonEl = await screen.findByRole("button", {
				name: /log in/i
			})
			expect(loginButtonEl).toBeInTheDocument()
		})

		it("should render a forgot password link", async () => {
			renderSignIn()
			const forgotPasswordLinkEl = await screen.findByRole("link", {
				name: /forgot password?/i
			})
			expect(forgotPasswordLinkEl).toBeInTheDocument()
		})

		it("should render a Google log in button", async () => {
			renderSignIn()
			const googleLoginButtonEl = await screen.findByRole("button", {
				name: /google/i
			})
			expect(googleLoginButtonEl).toBeInTheDocument()
		})

		// TODO:
		// it("should not initially render an error message", async () => {
		// 	renderSignIn()
		// 	const errorMessageEl = screen.queryByTestId("error")
		// 	expect(errorMessageEl).toBeNull()
		// })

		it("should render an error message for empty email input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const passwordInput = await screen.findByTestId("password-input")
			const loginButtonEl = await screen.findByRole("button", {
				name: /log in/i
			})

			await user.type(passwordInput, "123456")
			await user.click(loginButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/email is required/i)
			expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
		})

		it("should render an error message for invalid email", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const emailInput = await screen.findByTestId("email-input")
			const passwordInput = await screen.findByTestId("password-input")
			const loginButtonEl = await screen.findByRole("button", {
				name: /log in/i
			})

			await user.type(emailInput, "testemail")
			await user.type(passwordInput, "123456")
			await user.click(loginButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/invalid email/i)
			expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
		})

		it("should render an error message for empty password input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const emailInput = await screen.findByTestId("email-input")
			const loginButtonEl = await screen.findByRole("button", {
				name: /log in/i
			})

			await user.type(emailInput, "test@email.com")
			await user.click(loginButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/password is required/i)
			expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
		})
	})
	describe("Behaviour", () => {
		it("should allow users to type in the email input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const emailInput = await screen.findByTestId("email-input")
			await user.type(emailInput, "test@email.com")
			expect(emailInput).toHaveValue("test@email.com")
		})

		it("should allow users to type in the password input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const passwordInput = await screen.findByTestId("password-input")
			await user.type(passwordInput, "test")
			expect(passwordInput).toHaveValue("test")
		})
	})
})
