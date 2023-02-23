import React from "react";

function ShoppingCart({ cartItems, removeFromCart }) {
  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - {item.price}</p>
              <button onClick={() => handleRemove(item)}>Remove</button>
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
