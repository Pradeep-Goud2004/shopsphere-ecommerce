import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="detail">
      <img src={product.imageUrl} alt={product.name} />
      <div>
        <span className="muted">{product.brand}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>₹{Number(product.price).toLocaleString("en-IN")}</h2>
        <p>Available: {product.quantity ?? "Yes"}</p>
        {user && (
          <div className="product-detail-actions">

    <button onClick={() => addToCart(product.id)} >
      Add to Cart
    </button>

    <WishlistButton  productId={product.id}/>
</div>
)}
      </div>
    </div>
  );
}
