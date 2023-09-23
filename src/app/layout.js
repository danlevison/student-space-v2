import "./globals.css"
import { Nunito, Cabin_Sketch } from "next/font/google"
import { StudentDataProvider } from "@/context/StudentDataContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const nunito = Nunito({
	subsets: ["latin"],
	variable: "--font-nunito"
})

const cabinSketch = Cabin_Sketch({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-cabin",
	fallback: ["nunito"]
})

export const metadata = {
	title: "Student Space",
	description: "A class management app for primary school teachers"
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<StudentDataProvider>
				<body
					className={`${nunito.variable} ${cabinSketch.variable} font-nunito`}
				>
					{children}
					<ToastContainer
						position="top-center"
						pauseOnHover={false}
					/>
				</body>
			</StudentDataProvider>
		</html>
	)
}
