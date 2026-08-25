import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link className="brand" to="/">ShopSphere</Link>

      <nav>
        <Link to="/">Products</Link>
        {user && <Link to="/wishlist">Wishlist</Link>}
        {user && <Link to="/orders">Orders</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <Link to="/cart">Cart ({cart.length})</Link>
            <button className="link-button" onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
