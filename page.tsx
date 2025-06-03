import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">VANY LEST</h1>
          <p className="text-xl md:text-2xl mb-8">Seja muito bem vindo a nossa loja online! Veja as nossas coleções.</p>
          <a
            href="#products"
            className="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Search and Featured Products */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <SearchBar />
        <FeaturedProducts />
      </section>

      {/* Product Catalog */}
      <section id="products" className="container mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Our Collection</h2>
        <ProductGrid />
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
