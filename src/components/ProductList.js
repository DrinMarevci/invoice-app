import React from "react";
import data from "../products.json";
import "../index.css";

function ProductList({ onAddToCart }) {
  return (
    <div className="product-list-container">
      {data.products.map((product) => (
        <div key={product.id} className="product-box">
          <h3>{product.name}</h3>
          <p>Price: {product.price_per_unit}</p>
          <p>VAT: {product.vat}</p>
          {product.discount && <p>Discount: {product.discount}</p>}
          {product.quantity > 50 ? (
            <div>
              <p>Quantity: 50</p>
              <p>Number of items: {product.quantity / 50}</p>
            </div>
          ) : (
            <p>Quantity: {product.quantity}</p>
          )}
        <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(product)}>
                Add to cart
        </button>

        </div>
      ))}
    </div>
  );
}

export default ProductList;
