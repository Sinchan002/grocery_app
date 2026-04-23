import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(null); // null, 'form', 'success'

  const handleCheckout = () => {
    setCheckoutStep('form');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
    setTimeout(() => {
      clearCart();
    }, 300);
  };

  const handleBackToCart = () => {
    setCheckoutStep(null);
  };

  const handleCloseAll = () => {
    setCheckoutStep(null);
    onClose();
  };

  const deliveryFee = totalPrice > 35 ? 0 : 4.99;
  const orderTotal = totalPrice + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={handleCloseAll}
        id="cart-overlay"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
        id="cart-drawer"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="cart-drawer__header">
          {checkoutStep === 'form' ? (
            <button className="cart-drawer__back-btn" onClick={handleBackToCart}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back
            </button>
          ) : (
            <h2 className="cart-drawer__title">
              Your Cart
              {items.length > 0 && (
                <span className="cart-drawer__item-count">{items.length}</span>
              )}
            </h2>
          )}
          <button
            className="cart-drawer__close-btn"
            onClick={handleCloseAll}
            aria-label="Close cart"
            id="close-cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer__content">
          {checkoutStep === 'success' ? (
            <div className="cart-checkout-success" id="checkout-success">
              <div className="cart-checkout-success__icon">🎉</div>
              <h3 className="cart-checkout-success__title">Order Placed!</h3>
              <p className="cart-checkout-success__text">
                Your fresh groceries are on the way. Estimated delivery in 25-30 minutes.
              </p>
              <div className="cart-checkout-success__order-id">
                Order #{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </div>
              <button className="cart-checkout-success__btn" onClick={handleCloseAll}>
                Continue Shopping
              </button>
            </div>
          ) : checkoutStep === 'form' ? (
            <form className="cart-checkout-form" onSubmit={handlePlaceOrder} id="checkout-form">
              <div className="cart-checkout-form__section">
                <h3 className="cart-checkout-form__section-title">Delivery Address</h3>
                <input type="text" placeholder="Full Name" required className="cart-checkout-form__input" id="checkout-name" />
                <input type="text" placeholder="Street Address" required className="cart-checkout-form__input" id="checkout-address" />
                <div className="cart-checkout-form__row">
                  <input type="text" placeholder="City" required className="cart-checkout-form__input" id="checkout-city" />
                  <input type="text" placeholder="ZIP Code" required className="cart-checkout-form__input" id="checkout-zip" />
                </div>
                <input type="tel" placeholder="Phone Number" required className="cart-checkout-form__input" id="checkout-phone" />
              </div>

              <div className="cart-checkout-form__section">
                <h3 className="cart-checkout-form__section-title">Delivery Time</h3>
                <div className="cart-checkout-form__time-slots">
                  <label className="cart-checkout-form__time-slot">
                    <input type="radio" name="time" value="asap" defaultChecked />
                    <span className="cart-checkout-form__time-label">
                      <span className="cart-checkout-form__time-icon">⚡</span>
                      ASAP (25-30 min)
                    </span>
                  </label>
                  <label className="cart-checkout-form__time-slot">
                    <input type="radio" name="time" value="scheduled" />
                    <span className="cart-checkout-form__time-label">
                      <span className="cart-checkout-form__time-icon">📅</span>
                      Schedule Later
                    </span>
                  </label>
                </div>
              </div>

              <div className="cart-checkout-form__summary">
                <div className="cart-checkout-form__summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-checkout-form__summary-row">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="cart-checkout-form__free">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="cart-checkout-form__summary-row cart-checkout-form__summary-row--total">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="cart-checkout-form__submit" id="place-order-btn">
                Place Order — ${orderTotal.toFixed(2)}
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="cart-drawer__empty" id="cart-empty">
              <span className="cart-drawer__empty-icon">🛒</span>
              <h3 className="cart-drawer__empty-title">Your cart is empty</h3>
              <p className="cart-drawer__empty-text">
                Add some fresh groceries to get started!
              </p>
            </div>
          ) : (
            <>
              {/* Free delivery banner */}
              {totalPrice < 35 && (
                <div className="cart-drawer__free-delivery">
                  <span>🚚</span>
                  Add <strong>${(35 - totalPrice).toFixed(2)}</strong> more for free delivery!
                  <div className="cart-drawer__progress-bar">
                    <div
                      className="cart-drawer__progress-fill"
                      style={{ width: `${Math.min((totalPrice / 35) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {totalPrice >= 35 && (
                <div className="cart-drawer__free-delivery cart-drawer__free-delivery--unlocked">
                  <span>🎉</span> You've unlocked <strong>free delivery!</strong>
                </div>
              )}

              {/* Cart items */}
              <ul className="cart-drawer__items">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className="cart-item"
                    style={{ animationDelay: `${index * 50}ms` }}
                    id={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item__image"
                      loading="lazy"
                      width="64"
                      height="64"
                    />
                    <div className="cart-item__details">
                      <h4 className="cart-item__name">{item.name}</h4>
                      <span className="cart-item__weight">{item.weight}</span>
                      <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="cart-item__controls">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !checkoutStep && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span className="cart-drawer__total-label">Subtotal</span>
              <span className="cart-drawer__total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="cart-drawer__checkout-btn"
              onClick={handleCheckout}
              id="checkout-button"
            >
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button
              className="cart-drawer__clear-btn"
              onClick={clearCart}
              id="clear-cart-button"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
