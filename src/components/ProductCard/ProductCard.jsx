import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useTilt3D } from '../../hooks/useTilt3D';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const tilt = useTilt3D({ maxTilt: 6, scale: 1.02 });

  const inCart = items.find((item) => item.id === product.id);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="product-card"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      id={`product-card-${product.id}`}
    >
      {/* Badge */}
      {product.badge && (
        <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(/[\s-]/g, '')}`}>
          {product.badge}
        </span>
      )}

      {/* Discount badge */}
      {discount && (
        <span className="product-card__discount">-{discount}%</span>
      )}

      {/* Image */}
      <div className="product-card__image-wrapper">
        {!imgLoaded && <div className="product-card__image-skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          className={`product-card__image ${imgLoaded ? 'product-card__image--loaded' : ''}`}
          loading="lazy"
          width="400"
          height="400"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <span className="product-card__weight">{product.weight}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        {/* Rating */}
        <div className="product-card__rating">
          <span className="product-card__stars">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && '☆'}
          </span>
          <span className="product-card__rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price + action */}
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card__original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className={`product-card__add-btn ${isAdding ? 'product-card__add-btn--adding' : ''} ${inCart ? 'product-card__add-btn--in-cart' : ''}`}
            onClick={handleAdd}
            id={`add-to-cart-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <svg className="product-card__check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                {inCart && <span className="product-card__qty-badge">{inCart.quantity}</span>}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
