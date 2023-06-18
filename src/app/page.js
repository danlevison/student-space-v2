import LandingPage from "@/components/LandingPage"
import About from "@/components/About"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <LandingPage />
      <About />
      <Footer />
    </main>
  )
}
