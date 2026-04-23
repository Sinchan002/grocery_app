import { categories } from '../../data/products';
import './Categories.css';

export default function Categories({ activeCategory, onCategoryChange }) {
  return (
    <section className="categories" id="categories-section">
      <div className="container">
        <div className="categories__header">
          <h2 className="categories__title">Shop by Category</h2>
          <p className="categories__subtitle">Everything you need, neatly organized</p>
        </div>
        <div className="categories__grid">
          <button
            className={`category-pill ${activeCategory === 'all' ? 'category-pill--active' : ''}`}
            onClick={() => onCategoryChange('all')}
            id="category-all"
          >
            <span className="category-pill__emoji">🛒</span>
            <span className="category-pill__name">All Items</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'category-pill--active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
              id={`category-${cat.id}`}
              style={{ '--pill-color': cat.color }}
            >
              <span className="category-pill__emoji">{cat.emoji}</span>
              <span className="category-pill__name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
