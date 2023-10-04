import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import SignIn from "../SignIn"
import { AuthProvider } from "@/context/AuthContext"
import { AppRouterContextProviderMock } from "../../../../../../../__mocks__/AppRouterContextProviderMock"

describe("Render", () => {
	it("should render an email label", async () => {
		const push = jest.fn() // simulates router behavior

		render(
			<AppRouterContextProviderMock router={{ push }}>
				<AuthProvider>
					<SignIn />
				</AuthProvider>
			</AppRouterContextProviderMock>
		)

		const emailLabel = await screen.findByLabelText("Email")
		expect(emailLabel).toBeInTheDocument()
	})
})
