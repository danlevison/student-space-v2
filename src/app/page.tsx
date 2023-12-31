import Nav from "@/components/Nav/Nav"
import LandingPage from "@/components/landingPage/LandingPage"
import About from "@/components/about/About"
import Footer from "@/components/footer/Footer"

export default function Home() {
	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="flex flex-col items-center justify-between min-h-screen">
				<LandingPage />
				<About />
			</main>
			<Footer />
		</>
	)
}
