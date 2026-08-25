import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  const placeOrder = async (e) => {
    e.preventDefault();

    setError("");

    if (!address.trim()) {
      setError("Please enter your shipping address.");
      return;
    }

    if (!cart || cart.length === 0) {
      setError("Cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // 1. CREATE ORDER
      // ==========================================

      const response = await api.post("/orders", {
        shippingAddress: address.trim(),
      });

      console.log("=================================");
      console.log("ORDER API RESPONSE:");
      console.log(response);
      console.log("ORDER RESPONSE DATA:");
      console.log(response.data);
      console.log("=================================");

      const data = response.data;

      // ==========================================
      // 2. GET ORDER ID
      // ==========================================

      const orderId =
        data?.id ??
        data?.orderId ??
        data?.data?.id ??
        data?.data?.orderId;

      console.log("Extracted Order ID:", orderId);

      if (!orderId) {
        throw new Error(
          "Order was created, but no order ID was returned by the server."
        );
      }

      // ==========================================
      // 3. DEMO PAYMENT
      // ==========================================

      const reference = `DEMO-${Date.now()}`;

      console.log("Payment Reference:", reference);
      console.log("Paying Order ID:", orderId);

      const paymentResponse = await api.post(
        `/orders/${orderId}/payment`,
        {
          orderId: orderId,
          paymentReference: reference,
        }
      );

      console.log(
        "Payment response:",
        paymentResponse.data
      );

      // ==========================================
      // 4. CLEAR CART
      // ==========================================

      await clearCart();

      // ==========================================
      // 5. GO TO ORDERS
      // ==========================================

      navigate("/orders");

    } catch (err) {
      console.error("=================================");
      console.error("CHECKOUT ERROR:");
      console.error(err);

      console.error(
        "Status:",
        err.response?.status
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      console.error("=================================");

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Could not place order"
      );

    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="form-page">
        <div className="form-card">
          <h1>Checkout</h1>

          <div className="error">
            Cart is empty.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <form
        className="form-card"
        onSubmit={placeOrder}
      >
        <h1>Checkout</h1>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <textarea
          required
          rows="5"
          placeholder="Shipping address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <h2>
          Total: ₹
          {total.toLocaleString("en-IN")}
        </h2>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Place Order & Pay (Demo)"}
        </button>

        <small>
          Production note: integrate a real payment
          gateway before accepting real money.
        </small>
      </form>
    </div>
  );
}