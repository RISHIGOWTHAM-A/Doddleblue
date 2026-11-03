import AnnouncementBar from './_components/AnnouncementBar'
import Footer from './_components/Footer'
import Header from './_components/Header'
import HeroSection from './_components/HeroSection'
import MarqueeStrip from './_components/MarqueeStrip'
import ProductsSection from './_components/ProductsSection'
import StorySection from './_components/StorySection'
import FeaturesSection from './_components/FeaturesSection'
import TestimonialsSection from './_components/TestimonialsSection'
import GiftingSection from './_components/GiftingSection'
import useCart from './_hooks/useCart'

const LandingPage = () => {
  const { items } = useCart()

  return (
    <div className="min-h-screen bg-cream text-ink">
      <AnnouncementBar />
      <Header cartCount={items} />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <ProductsSection />
        <StorySection />
        <FeaturesSection />
        <TestimonialsSection />
        <GiftingSection />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
