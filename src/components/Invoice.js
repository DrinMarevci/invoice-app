import React from "react";

function Invoice({ items }) {
  const totalPrice = items.reduce(
    (total, { price_per_unit, quantity }) => total + price_per_unit * quantity,
    0
  );

  return (
    <div className="invoice">
      <h2>Invoice</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price $</th>
            <th>VAT %</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price_per_unit} $</td>
              <td>{item.vat} %</td>
              <td>{item.quantity}</td>
              <td>{item.price_per_unit * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Invoice;
