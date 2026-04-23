import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import ProductGrid from './components/ProductGrid/ProductGrid';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <div className="app">
        <Header
          onCartClick={() => setCartOpen(true)}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />
        <main className="main-content">
          <Hero />
          <Categories
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ProductGrid
            category={activeCategory}
            searchQuery={searchQuery}
          />
        </main>
        <Footer />
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
