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
	getAuth: jest.fn(() => {}),
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
		it("should render an email label", () => {
			renderSignIn()
			const emailLabel = screen.getByLabelText(/email/i)
			expect(emailLabel).toBeInTheDocument()
		})

		it("should render an email input", () => {
			renderSignIn()
			const emailInput = screen.getByTestId("email-input")
			expect(emailInput).toBeInTheDocument()
			expect(emailInput).toHaveAttribute("type", "email")
		})

		it("should render a password label", () => {
			renderSignIn()
			const passwordLabel = screen.getByLabelText(/password/i)
			expect(passwordLabel).toBeInTheDocument()
		})

		it("should render a password input", () => {
			renderSignIn()
			const passwordInput = screen.getByTestId("password-input")
			expect(passwordInput).toBeInTheDocument()
			expect(passwordInput).toHaveAttribute("type", "password")
		})

		it("should render a log in button", () => {
			renderSignIn()
			const loginButtonEl = screen.getByRole("button", {
				name: /log in/i
			})
			expect(loginButtonEl).toBeInTheDocument()
		})

		it("should render a forgot password link", () => {
			renderSignIn()
			const forgotPasswordLinkEl = screen.getByRole("link", {
				name: /forgot password?/i
			})
			expect(forgotPasswordLinkEl).toBeInTheDocument()
		})

		it("should render a Google log in button", () => {
			renderSignIn()
			const googleLoginButtonEl = screen.getByRole("button", {
				name: /google/i
			})
			expect(googleLoginButtonEl).toBeInTheDocument()
		})

		it("should not initially render an error message", () => {
			renderSignIn()
			const errorMessageEl = screen.queryByTestId("error")
			expect(errorMessageEl).not.toBeInTheDocument()
		})

		it("should render an error message for empty email input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const passwordInput = screen.getByTestId("password-input")
			const loginButtonEl = screen.getByRole("button", {
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

			const emailInput = screen.getByTestId("email-input")
			const passwordInput = screen.getByTestId("password-input")
			const loginButtonEl = screen.getByRole("button", {
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

			const emailInput = screen.getByTestId("email-input")
			const loginButtonEl = screen.getByRole("button", {
				name: /log in/i
			})

			await user.type(emailInput, "test@email.com")
			await user.click(loginButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/password is required/i)
			expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
		})

		// TODO:
		// it("should render an error message if the email is incorrect", async () => {
		// 	const user = userEvent.setup()
		// 	renderSignIn()

		// 	const testEmail = "testemail@email.com"
		// 	const testPassword = "123456"
		// 	const auth = getAuth()

		// 	const emailInput = await screen.findByTestId("email-input")
		// 	const passwordInput = await screen.findByTestId("password-input")
		// 	const loginButtonEl = await screen.findByRole("button", {
		// 		name: /log in/i
		// 	})

		// 	await user.type(emailInput, testEmail)
		// 	await user.type(passwordInput, testPassword)
		// 	await user.click(loginButtonEl)

		// 	expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
		// 		auth,
		// 		testEmail,
		// 		testPassword
		// 	)

		// 	const errorMessageEl = await screen.findByTestId("error")
		// 	expect(errorMessageEl).toHaveTextContent(/incorrect email or password/i)
		// })
	})
	describe("Behaviour", () => {
		it("should allow users to type in the email input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const emailInput = screen.getByTestId("email-input")
			await user.type(emailInput, "test@email.com")
			expect(emailInput).toHaveValue("test@email.com")
		})

		it("should allow users to type in the password input", async () => {
			const user = userEvent.setup()
			renderSignIn()

			const passwordInput = screen.getByTestId("password-input")
			await user.type(passwordInput, "test")
			expect(passwordInput).toHaveValue("test")
		})
	})
})
