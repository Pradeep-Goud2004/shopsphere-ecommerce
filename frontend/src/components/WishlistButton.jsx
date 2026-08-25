import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./WishlistButton.css";

const WishlistButton = ({ productId }) => {
  const { user } = useAuth();

  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // CHECK PRODUCT WISHLIST STATUS
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const checkWishlistStatus = async () => {
      if (!user || !productId) {
        if (mounted) {
          setInWishlist(false);
        }
        return;
      }

      try {
        const response = await api.get("/wishlist");

        const wishlistData = Array.isArray(response.data)
          ? response.data
          : response.data?.content ||
            response.data?.items ||
            response.data?.wishlist ||
            [];

        const exists = wishlistData.some((item) => {
          const wishlistProductId =
            item.product?.id ??
            item.productId ??
            item.id;

          return Number(wishlistProductId) === Number(productId);
        });

        if (mounted) {
          setInWishlist(exists);
        }

      } catch (error) {
        console.error(
          "Error checking wishlist:",
          error
        );

        if (mounted) {
          setInWishlist(false);
        }
      }
    };

    checkWishlistStatus();

    return () => {
      mounted = false;
    };
  }, [user, productId]);


  // =====================================================
  // ADD / REMOVE PRODUCT
  // =====================================================

  const handleWishlist = async () => {

    if (!user) {
      alert(
        "Please login to add products to your wishlist."
      );
      return;
    }

    if (!productId || loading) {
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // REMOVE PRODUCT
      // =================================================

      if (inWishlist) {

        await api.delete(
          `/wishlist/${productId}`
        );

        // Update UI ONLY after backend succeeds
        setInWishlist(false);

      }

      // =================================================
      // ADD PRODUCT
      // =================================================

      else {

        await api.post(
          `/wishlist/${productId}`
        );

        // Update UI ONLY after backend succeeds
        setInWishlist(true);

      }

    } catch (error) {

      console.error(
        "Wishlist update error:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Unable to update wishlist. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // BUTTON
  // =====================================================

  return (
    <button
      type="button"
      className={`wishlist-button ${
        inWishlist
          ? "wishlist-active"
          : ""
      }`}
      onClick={handleWishlist}
      disabled={loading}
      title={
        !user
          ? "Login to use wishlist"
          : inWishlist
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
    >

      <span className="wishlist-heart">
        {inWishlist ? "♥" : "♡"}
      </span>

      <span>
        {loading
          ? "Updating..."
          : inWishlist
          ? "Wishlisted"
          : "Add to Wishlist"}
      </span>

    </button>
  );
};

export default WishlistButton;