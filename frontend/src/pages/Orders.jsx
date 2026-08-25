import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/orders/my");

        console.log("Orders API response:", response.data);

        // Backend should return an array
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error(
            "Unexpected orders response:",
            response.data
          );

          setOrders([]);
          setError(
            "Invalid orders data received from server."
          );
        }

      } catch (err) {
        console.error("Failed to load orders:", err);

        console.error(
          "Status:",
          err.response?.status
        );

        console.error(
          "Backend response:",
          err.response?.data
        );

        setOrders([]);

        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Could not load orders"
        );

      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>My Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Orders</h1>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <p>No orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          className="order-card"
          key={order.id}
        >
          <div>
            <h3>
              Order #{order.id}
            </h3>

            <p>
              {order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString()
                : ""}
            </p>

            <p>
              Status:{" "}
              <strong>
                {order.status}
              </strong>
            </p>

            <p>
              Payment:{" "}
              <strong>
                {order.paymentStatus}
              </strong>
            </p>

            <p>
              Shipping Address:{" "}
              {order.shippingAddress}
            </p>
          </div>

          <strong>
            ₹
            {Number(
              order.totalAmount || 0
            ).toLocaleString("en-IN")}
          </strong>
        </div>
      ))}
    </div>
  );
}