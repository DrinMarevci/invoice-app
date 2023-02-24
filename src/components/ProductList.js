import React, { useState } from "react";
import data from "../products.json";
import "../index.css";

function ProductList({ onAddToCart }) {
  const [quantities, setQuantities] = useState(
    data.products.map((product) => product.quantity)
  );

  const handleQuantityChange = (index, value) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((prevValue, i) => (i === index ? value : prevValue))
    );
  };

  return (
    <div className="product-list-container">
      {data.products.map((product, index) => (
        <div key={product.id} className="product-box">
          <h3>{product.name}</h3>
          <p>Price: {product.price_per_unit}</p>
          <p>VAT: {product.vat}</p>
          {product.discount && <p>Discount: {product.discount}</p>}
          {quantities[index] > 50 ? (
            <div>
              <p>Quantity: 50</p>
              <p>Number of items: {quantities[index] / 50}</p>
            </div>
          ) : (
            <p>Quantity: {quantities[index]}</p>
          )}
          <input
            type="number"
            value={quantities[index]}
            onChange={(event) =>
              handleQuantityChange(index, parseInt(event.target.value))
            }
          />
          <button
            className="add-to-cart-button"
            onClick={() =>
              onAddToCart({ ...product, quantity: quantities[index] })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
