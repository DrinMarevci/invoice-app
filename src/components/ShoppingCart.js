import React, { useState, useEffect } from "react";
import Invoice from "./Invoice";

function ShoppingCart({ cartItems, removeFromCart }) {
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    setQuantities(
      cartItems.reduce((quantities, item) => {
        quantities[item.id] = item.quantity || 1;
        return quantities;
      }, {})
    );
  }, [cartItems]);

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
    setSelectedItems([...selectedItems, { ...item, quantity }]);
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    removeFromCart(updatedCartItems);
  };

  const handleCreateInvoice = () => {
    setShowInvoice(true);
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
                {item.name} - Price:{item.price_per_unit}$, VAT:{item.vat}%
              </p>
              <input
                type="number"
                min="1"
                value={quantities[item.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(item.id, +e.target.value)
                }
              />
              <button onClick={() => handleAddToCart(item)}>Buy</button>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          {selectedItems.length > 0 && (
            <>
              <hr />
              <p>Total: {selectedItems.reduce((total, { price_per_unit, quantity }) => total + price_per_unit * quantity, 0)}</p>
              <button onClick={handleCreateInvoice}>Create Invoice</button>
            </>
          )}
        </>
      )}
      {showInvoice && (
        <Invoice
          items={selectedItems}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
}

export default ShoppingCart;
