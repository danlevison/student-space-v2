import Nav from "@/components/Nav"
import LandingPage from "@/components/LandingPage"
import About from "@/components/about/About"
import Footer from "@/components/Footer"

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
