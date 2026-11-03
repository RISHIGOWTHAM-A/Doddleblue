import AnnouncementBar from './_components/AnnouncementBar.jsx'
import Footer from './_components/Footer.jsx'
import GiftingSection from './_components/GiftingSection.jsx'
import Header from './_components/Header.jsx'
import HeroSection from './_components/HeroSection.jsx'
import ProductsSection from './_components/ProductsSection.jsx'
import PromiseBar from './_components/PromiseBar.jsx'
import StorySection from './_components/StorySection.jsx'
import useCart from './_hooks/useCart.js'

function LandingPage() {
  const { items, addItem } = useCart()

  return (
    <div className="min-h-screen bg-cream text-maroon">
      <AnnouncementBar />
      <Header cartCount={items} />
      <main>
        <HeroSection />
        <PromiseBar />
        <ProductsSection onAdd={addItem} />
        <StorySection />
        <GiftingSection />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
