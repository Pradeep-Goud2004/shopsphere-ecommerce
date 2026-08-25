import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { user } = useAuth();
  const { addToCart } = useCart();

  const load = async () => {
    const params = {};
    if (search) params.search = search;
    if (categoryId) params.categoryId = categoryId;
    const [p, c] = await Promise.all([
      api.get("/products", { params }),
      api.get("/categories")
    ]);
    setProducts(p.data);
    setCategories(c.data);
  };

  useEffect(() => { load(); }, [categoryId]);

  const submitSearch = (e) => {
    e.preventDefault();
    load();
  };

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">MODERN E-COMMERCE</p>
          <h1>Everything you need, in one place.</h1>
          <p>Discover products, manage your cart, and track your orders.</p>
        </div>
      </section>

      <div className="toolbar">
        <form onSubmit={submitSearch} className="search">
          <input value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search products..." />
          <button>Search</button>
        </form>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <section className="product-grid">
        {products.map(p => (
          <article className="card" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <div className="card-body">
              <span className="muted">{p.brand}</span>
              <h3>{p.name}</h3>
              <p className="muted">{p.description}</p>
              <strong>₹{Number(p.price).toLocaleString("en-IN")}</strong>
             <div className="actions">

            <Link className="secondary" to={`/products/${p.id}`}>
              Details
            </Link>

            {user ? ( <button onClick={() => addToCart(p.id)}>
                Add to Cart
              </button>
            ) : (
              <Link className="secondary" to="/login">Login to Buy</Link>
            )}

            <WishlistButton
              productId={p.id}
            />

            </div>
                     
             </div>
          </article>
        ))}
      </section>
    </div>
  );
}
