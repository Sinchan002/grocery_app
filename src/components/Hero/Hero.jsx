import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero-section">
      <div className="hero__bg-shapes">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <span className="hero__badge">🌿 Farm Fresh Daily</span>
          <h1 className="hero__title">
            Fresh Groceries,
            <br />
            <span className="hero__title-accent">Delivered Fast</span>
          </h1>
          <p className="hero__subtitle">
            Hand-picked produce, artisan goods, and pantry essentials — straight
            from local farms to your doorstep in under 30 minutes.
          </p>
          <div className="hero__actions">
            <a href="#products-section" className="hero__cta hero__cta--primary" id="hero-cta-shop">
              Shop Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#categories-section" className="hero__cta hero__cta--secondary" id="hero-cta-browse">
              Browse Categories
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">2,500+</span>
              <span className="hero__stat-label">Products</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">30 min</span>
              <span className="hero__stat-label">Delivery</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">4.9★</span>
              <span className="hero__stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <img
              src="/images/hero-banner.png"
              alt="Fresh produce floating in a vibrant arrangement"
              className="hero__image"
              loading="eager"
              width="600"
              height="500"
            />
          </div>
          {/* Floating accent items */}
          <div className="hero__float hero__float--1">🍎</div>
          <div className="hero__float hero__float--2">🥑</div>
          <div className="hero__float hero__float--3">🍊</div>
          <div className="hero__float hero__float--4">🥕</div>
          <div className="hero__float hero__float--5">🫐</div>
        </div>
      </div>
    </section>
  );
}
