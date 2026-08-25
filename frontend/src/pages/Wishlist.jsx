import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");



  const loadWishlist = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/wishlist"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content ||
          response.data?.items ||
          response.data?.wishlist ||
          [];

      setWishlist(data);

    } catch (error) {

      console.error(
        "Error loading wishlist:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load wishlist."
      );

      setWishlist([]);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {

    if (!productId || removingId !== null) {
      return;
    }

    try {

      setRemovingId(productId);

      await api.delete(
        `/wishlist/${productId}`
      );

      // Remove immediately from screen
      setWishlist((previousWishlist) =>
        previousWishlist.filter((item) => {

          const itemProductId =
            item.product?.id ??
            item.productId ??
            item.id;

          return (
            Number(itemProductId) !==
            Number(productId)
          );

        })
      );

    } catch (error) {

      console.error(
        "Error removing wishlist item:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to remove product from wishlist."
      );

    } finally {

      setRemovingId(null);

    }
  };


  if (loading) {

    return (
      <div className="page">

        <h1>Wishlist</h1>

        <p>Loading wishlist...</p>

      </div>
    );

  }


  if (error) {

    return (
      <div className="page">

        <h1>Wishlist</h1>

        <div className="error-message">
          {error}
        </div>

        <button
          onClick={loadWishlist}
        >
          Try Again
        </button>

      </div>
    );

  }


  if (wishlist.length === 0) {

    return (
      <div className="page">

        <h1>Wishlist</h1>

        <div className="empty-state">

          <div className="empty-heart">
            ♡
          </div>

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            Add products you love to your wishlist.
          </p>

          <Link
            to="/"
            className="secondary"
          >
            Browse Products
          </Link>

        </div>

      </div>
    );

  }


  return (

    <div className="page">

      <h1>Wishlist</h1>

      <div className="grid">

        {wishlist.map((item) => {

          const product = item.product;

          if (!product) {
            return null;
          }

          const productId = product.id;

          return (

            <div
              className="card"
              key={item.id ?? productId}
            >

              {/* PRODUCT IMAGE */}
                <img
                    src={
                      product.imageUrl
                        ? product.imageUrl.startsWith("http")
                          ? product.imageUrl
                          : product.imageUrl.startsWith("/")
                            ? product.imageUrl
                            : `/${product.imageUrl}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />


                            {/* PRODUCT NAME */}

              <h2>
                {product.name}
              </h2>


              {/* PRICE */}

              <div className="price">
                ₹
                {Number(
                  product.price || 0
                ).toLocaleString("en-IN")}
              </div>


              {/* BUTTONS */}

              <div className="actions">

                <Link
                  to={`/products/${productId}`}
                  className="secondary"
                >
                  View
                </Link>


                <button
                  className="remove-wishlist-button"
                  onClick={() =>
                    removeFromWishlist(
                      productId
                    )
                  }
                  disabled={
                    removingId === productId
                  }
                >

                  {removingId === productId
                    ? "Removing..."
                    : "Remove"}

                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
};

export default Wishlist;