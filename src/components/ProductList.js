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
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart({ ...product, quantity: 1 })}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
