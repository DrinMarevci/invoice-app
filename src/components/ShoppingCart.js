import React, { useState } from "react";

function ShoppingCart({ cartItems, removeFromCart }) {
  const [quantities, setQuantities] = useState(
    cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {})
  );

  const cartTotal = cartItems.reduce((acc, product) => {
    return acc + product.price_per_unit * quantities[product.id];
  }, 0);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        removeFromCart(product);
      }
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((product) => (
            <div key={product.id} className="cart-item">
              <p>
                {product.price_per_unit} - {product.name}
              </p>
              <input
                type="number"
                value={quantities[product.id]}
                onChange={(event) =>
                  handleQuantityChange(
                    product.id,
                    parseInt(event.target.value)
                  )
                }
              />
              <button onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
              <button onClick={() => handleRemove(product)}>Remove</button>
            </div>
          ))}
          <hr />
          <p>Total: {cartTotal}</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
