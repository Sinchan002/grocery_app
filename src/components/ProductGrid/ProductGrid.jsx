import { useMemo } from 'react';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ category, searchQuery }) {
  const filtered = useMemo(() => {
    let result = products;

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [category, searchQuery]);

  return (
    <section className="product-grid-section" id="products-section">
      <div className="container">
        <div className="product-grid__header">
          <h2 className="product-grid__title">
            {category === 'all' || !category
              ? 'All Products'
              : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>
          <span className="product-grid__count">{filtered.length} items</span>
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid" id="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="product-grid__empty" id="empty-state">
            <span className="product-grid__empty-icon">🔍</span>
            <h3 className="product-grid__empty-title">No products found</h3>
            <p className="product-grid__empty-text">
              Try adjusting your search or browse a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
