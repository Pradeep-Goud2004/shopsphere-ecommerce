import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty"><p>Your cart is empty.</p><Link to="/">Shop products</Link></div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.product.imageUrl} alt={item.product.name}/>
                <div>
                  <h3>{item.product.name}</h3>
                  <p>₹{Number(item.product.price).toLocaleString("en-IN")}</p>
                  <input type="number" min="1" value={item.quantity}
                    onChange={e => updateQuantity(item.product.id, Number(e.target.value))}/>
                  <button className="danger" onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-box">
            <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>
            <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
