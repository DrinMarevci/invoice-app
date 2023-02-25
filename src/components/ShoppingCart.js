import React, { useState, useEffect } from "react";

function ShoppingCart({ cartItems, removeFromCart, createInvoice }) {
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setQuantities(
      cartItems.reduce((quantities, item) => {
        quantities[item.id] = item.quantity || 1;
        return quantities;
      }, {})
    );
  }, [cartItems]);

  const cartTotal = cartItems.reduce(
    (total, { price_per_unit, id }) => total + price_per_unit * quantities[id],
    0
  );

  const handleQuantityChange = (id, quantity) =>
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: quantity }));

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id];
    const maxQuantity = item.max_quantity || 50;
    const totalQuantity = cartItems.reduce(
      (total, { id, quantity: itemQuantity }) =>
        total + (id === item.id ? quantity : itemQuantity),
      0
    );
    if (totalQuantity > maxQuantity) {
      alert(
        `Cannot add ${quantity} ${item.name}(s) to cart. Maximum quantity is ${maxQuantity}.`
      );
      return;
    }
    for (let i = 0; i < quantity; i++) {
      setSelectedItems([...selectedItems, item]);
      removeFromCart(item);
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>
                {item.price_per_unit} - {item.name}
              </p>
              <input
                type="number"
                min="1"
                value={quantities[item.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
              <button onClick={() => handleAddToCart(item)}>Add to cart</button>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <hr />
          <p>Total: {cartTotal}</p>
          <button onClick={() => createInvoice(selectedItems)}>Create Invoice</button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
