import React from "react";

function Invoice({ items }) {
  const invoices = [];
  let currentInvoice = { items: [], totalPrice: 0 };

  items.forEach((item) => {
    const price = item.price_per_unit * item.quantity * (1 + item.vat / 100);
    if (currentInvoice.totalPrice + price > 500) {
      invoices.push(currentInvoice);
      currentInvoice = { items: [], totalPrice: 0 };
    }
    currentInvoice.items.push(item);
    currentInvoice.totalPrice += price;
  });

  if (currentInvoice.items.length > 0) {
    invoices.push(currentInvoice);
  }

  return (
    <div>
      {invoices.map((invoice, index) => (
        <div className="invoice" key={index}>
          <h2>Invoice {index + 1}</h2>
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
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price_per_unit} $</td>
                  <td>{item.vat} %</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.price_per_unit * item.quantity * (1 + item.vat / 100)).toFixed(2)} $
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>{invoice.totalPrice.toFixed(2)} $</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Invoice;
