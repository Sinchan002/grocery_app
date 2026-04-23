import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Header.css';

export default function Header({ onCartClick, onSearchChange, searchQuery }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="site-header">
      <div className="header__inner container">
        {/* Logo */}
        <a href="/" className="header__logo" id="logo-link">
          <span className="header__logo-icon">🥬</span>
          <span className="header__logo-text">
            Fresh<span className="header__logo-accent">Cart</span>
          </span>
        </a>

        {/* Desktop Search */}
        <div className="header__search-wrapper" id="search-wrapper">
          <div className="header__search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            id="search-input"
            className="header__search-input"
            placeholder="Search for fresh groceries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              className="header__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="header__actions">
          {/* Mobile search toggle */}
          <button
            className="header__action-btn header__mobile-search-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle search"
            id="mobile-search-toggle"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>

          {/* Cart button */}
          <button
            className={`header__cart-btn ${cartBump ? 'header__cart-btn--bump' : ''}`}
            onClick={onCartClick}
            aria-label={`Shopping cart with ${totalItems} items`}
            id="cart-button"
          >
            <svg className="header__cart-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {totalItems > 0 && (
              <span className="header__cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="header__mobile-search" id="mobile-search-bar">
          <div className="container">
            <div className="header__search-wrapper header__search-wrapper--mobile">
              <div className="header__search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input
                type="text"
                className="header__search-input"
                placeholder="Search for fresh groceries..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search products"
                autoFocus
              />
              {searchQuery && (
                <button
                  className="header__search-clear"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
