import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1440,60 L1440,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-icon">🥬</span>
              <span className="footer__logo-text">
                Fresh<span className="footer__logo-accent">Cart</span>
              </span>
            </a>
            <p className="footer__tagline">
              Farm-fresh groceries delivered to your door in 30 minutes or less.
              Quality you can taste, convenience you'll love.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">📸</a>
              <a href="#" className="footer__social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="footer__social-link" aria-label="Facebook">📘</a>
            </div>
          </div>

          {/* Links */}
          <div className="footer__links-group">
            <h4 className="footer__links-title">Shop</h4>
            <ul className="footer__links">
              <li><a href="#categories-section">All Categories</a></li>
              <li><a href="#products-section">Best Sellers</a></li>
              <li><a href="#products-section">On Sale</a></li>
              <li><a href="#products-section">New Arrivals</a></li>
            </ul>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Help</h4>
            <ul className="footer__links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Delivery Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Company</h4>
            <ul className="footer__links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
