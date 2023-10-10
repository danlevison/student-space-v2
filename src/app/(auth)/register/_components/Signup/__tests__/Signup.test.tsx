import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Signup from "../Signup"
import { AuthProvider } from "@/context/AuthContext"
import { AppRouterContextProviderMock } from "@/__mocks__/AppRouterContextProviderMock"
import userEvent from "@testing-library/user-event"
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth"

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(() => {}),
	createUserWithEmailAndPassword: jest.fn(() => {
		return Promise.resolve(null)
	}),
	onAuthStateChanged: jest.fn((auth, fn) => {
		fn(null)
	})
}))

function renderSignup() {
	const push = jest.fn() // simulates router behavior
	return render(
		<AppRouterContextProviderMock router={{ push }}>
			<AuthProvider>
				<Signup />
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
			renderSignup()
			const emailLabel = screen.getByLabelText(/email/i)
			expect(emailLabel).toBeInTheDocument()
		})

		it("should render an email input", () => {
			renderSignup()
			const emailInput = screen.getByTestId("email-input")
			expect(emailInput).toBeInTheDocument()
			expect(emailInput).toHaveAttribute("type", "email")
		})

		it("should render a password label", () => {
			renderSignup()
			const passwordLabel = screen.getByTestId("password-label")
			expect(passwordLabel).toBeInTheDocument()
		})

		it("should render a password input", () => {
			renderSignup()
			const passwordInput = screen.getByTestId("password-input")
			expect(passwordInput).toBeInTheDocument()
			expect(passwordInput).toHaveAttribute("type", "password")
		})

		it("should render a confirm password label", () => {
			renderSignup()
			const confirmPasswordLabel = screen.getByLabelText(/confirm password/i)
			expect(confirmPasswordLabel).toBeInTheDocument()
		})

		it("should render a confirm password input", () => {
			renderSignup()
			const confirmPasswordInput = screen.getByTestId("confirm-password-input")
			expect(confirmPasswordInput).toBeInTheDocument()
			expect(confirmPasswordInput).toHaveAttribute("type", "password")
		})

		it("should render a sign up button that is initially disabled", () => {
			renderSignup()
			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})
			expect(signupButtonEl).toBeInTheDocument()
			expect(signupButtonEl).toBeDisabled()
		})

		it("should render an error message for invalid email", async () => {
			const user = userEvent.setup()
			renderSignup()

			const emailInput = screen.getByTestId("email-input")
			const passwordInput = screen.getByTestId("password-input")
			const confirmPasswordInput = screen.getByTestId("confirm-password-input")
			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})

			await user.type(emailInput, "testemail.com")
			await user.type(passwordInput, "testpassword")
			await user.type(confirmPasswordInput, "testpassword")
			await user.click(signupButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/invalid email/i)
		})

		it("should render an error message for mismatched passwords", async () => {
			const user = userEvent.setup()
			renderSignup()

			const emailInput = screen.getByTestId("email-input")
			const passwordInput = screen.getByTestId("password-input")
			const confirmPasswordInput = screen.getByTestId("confirm-password-input")
			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})

			await user.type(emailInput, "testemail@email.com")
			await user.type(passwordInput, "testpassword1")
			await user.type(confirmPasswordInput, "testpassword2")
			await user.click(signupButtonEl)

			const errorMessageEl = screen.getByTestId("error")
			expect(errorMessageEl).toHaveTextContent(/passwords do not match/i)
		})

		//TODO :
		// it("should render an error message for weak password", async () => {
		// 	const user = userEvent.setup()
		// 	renderSignup()

		// 	const emailInput = screen.getByTestId("email-input")
		// 	const passwordInput = screen.getByTestId("password-input")
		// 	const confirmPasswordInput = screen.getByTestId("confirm-password-input")
		// 	const signupButtonEl = screen.getByRole("button", {
		// 		name: /sign up/i
		// 	})

		// 	await user.type(emailInput, "testemail@email.com")
		// 	await user.type(passwordInput, "test")
		// 	await user.type(confirmPasswordInput, "test")
		// 	await user.click(signupButtonEl)

		// 	const errorMessageEl = screen.getByTestId("error")
		// 	expect(errorMessageEl).toHaveTextContent(
		// 		/password should be at least 6 characters/i
		// 	)
		// })

		//TODO :
		// it("should render an error message for email already registered", async () => {
		// 	const user = userEvent.setup()
		// 	renderSignup()

		// 	const emailInput = screen.getByTestId("email-input")
		// 	const passwordInput = screen.getByTestId("password-input")
		// 	const confirmPasswordInput = screen.getByTestId("confirm-password-input")
		// 	const signupButtonEl = screen.getByRole("button", {
		// 		name: /sign up/i
		// 	})

		// 	await user.type(emailInput, "studentspaceappofficial@gmail.com")
		// 	await user.type(passwordInput, "testpassword")
		// 	await user.type(confirmPasswordInput, "testpassword")
		// 	await user.click(signupButtonEl)

		// 	const errorMessageEl = screen.getByTestId("error")
		// 	expect(errorMessageEl).toHaveTextContent(
		// 		/email address is already registered/i
		// 	)
		// })
	})
	describe("Behaviour", () => {
		it("should allow users to type in the email input", async () => {
			const user = userEvent.setup()
			renderSignup()

			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})
			const emailInput = screen.getByTestId("email-input")

			await user.type(emailInput, "test@email.com")

			expect(emailInput).toHaveValue("test@email.com")
			expect(signupButtonEl).toBeDisabled()
		})

		it("should allow users to type in the password input", async () => {
			const user = userEvent.setup()
			renderSignup()

			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})
			const passwordInput = screen.getByTestId("password-input")

			await user.type(passwordInput, "testpassword")

			expect(passwordInput).toHaveValue("testpassword")
			expect(signupButtonEl).toBeDisabled()
		})

		it("should allow users to type in the confirm password input", async () => {
			const user = userEvent.setup()
			renderSignup()

			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})
			const confirmPasswordInput = screen.getByTestId("confirm-password-input")

			await user.type(confirmPasswordInput, "testconfirmpassword")

			expect(confirmPasswordInput).toHaveValue("testconfirmpassword")
			expect(signupButtonEl).toBeDisabled()
		})

		it("should enable the sign up button when all inputs contain text", async () => {
			const user = userEvent.setup()
			renderSignup()

			const emailInput = screen.getByTestId("email-input")
			const passwordInput = screen.getByTestId("password-input")
			const confirmPasswordInput = screen.getByTestId("confirm-password-input")
			const signupButtonEl = screen.getByRole("button", {
				name: /sign up/i
			})

			await user.type(emailInput, "testemail@email.com")
			await user.type(passwordInput, "testpassword")
			await user.type(confirmPasswordInput, "testpassword")

			expect(signupButtonEl).toBeEnabled()
		})
	})
})
