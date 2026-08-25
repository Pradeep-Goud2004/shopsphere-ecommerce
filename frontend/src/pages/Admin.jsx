
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const [p, u, o, c] = await Promise.all([
        api.get("/admin/products"),
        api.get("/admin/users"),
        api.get("/admin/orders"),
        api.get("/admin/categories")
      ]);

      /*
       * Backend may return either:
       *
       * [...]
       *
       * OR
       *
       * { content: [...] }
       *
       * OR
       *
       * { products: [...] }
       *
       * etc.
       *
       * Normalize everything into arrays.
       */

      const productsData = Array.isArray(p.data)
        ? p.data
        : p.data?.content ||
          p.data?.products ||
          [];

      const usersData = Array.isArray(u.data)
        ? u.data
        : u.data?.content ||
          u.data?.users ||
          [];

      const ordersData = Array.isArray(o.data)
        ? o.data
        : o.data?.content ||
          o.data?.orders ||
          [];

      const categoriesData = Array.isArray(c.data)
        ? c.data
        : c.data?.content ||
          c.data?.categories ||
          [];

      setProducts(productsData);
      setUsers(usersData);
      setOrders(ordersData);
      setCategories(categoriesData);

    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load admin dashboard."
      );

      setProducts([]);
      setUsers([]);
      setOrders([]);
      setCategories([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.put(
        `/admin/orders/${id}/status?status=${status}`
      );

      await load();

    } catch (err) {
      console.error("Order status update error:", err);

      alert(
        err.response?.data?.message ||
        "Unable to update order status."
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          gap: "15px",
          flexWrap: "wrap"
        }}
      >
        <div>
          <h1>Admin Dashboard</h1>

          <p className="muted">
            Manage products, users and orders
          </p>
        </div>

        {/* ADD PRODUCT BUTTON */}

        <Link
          to="/admin/products/add"
          className="secondary"
          style={{
            padding: "12px 18px",
            fontWeight: "600"
          }}
        >
           Add New Product
        </Link>
      </div>


      {/* ERROR */}

      {error && (
        <div
          style={{
            background: "#fee4e2",
            color: "#b42318",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}


      {/* STATISTICS */}

      <div className="stats">

        <div>
          <strong>
            {products.length}
          </strong>

          <span>
            Products
          </span>
        </div>

        <div>
          <strong>
            {users.length}
          </strong>

          <span>
            Users
          </span>
        </div>

        <div>
          <strong>
            {orders.length}
          </strong>

          <span>
            Orders
          </span>
        </div>

        <div>
          <strong>
            {categories.length}
          </strong>

          <span>
            Categories
          </span>
        </div>

      </div>


      {/* PRODUCTS */}

      <h2>Products</h2>

      <div className="table-wrap">

        <table  className="admin-products-table">

          <thead>

           <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Available</th>
            <th  className="action-column">Action</th>
          </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td colSpan="7" className="no-products">
                  No products found.
                </td>
              </tr>

            ) : (

              products.map((product) => (

                <tr key={product.id}>

                  <td>
                    {product.id}
                  </td>

                  <td>
                    {product.name}
                  </td>

                  <td>
                    {product.brand || "-"}
                  </td>

                  <td>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {product.quantity ?? 0}
                  </td>

                  <td>
                    {product.available
                      ? "Yes"
                      : "No"}
                   </td>   

                       <td className="action-column">

                     <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="edit-product-button"
                      >Edit</Link>  
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* USERS */}

      <h2>Users</h2>

      <div className="table-wrap">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No users found.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr key={user.id}>

                  <td>
                    {user.id}
                  </td>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.role}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* ORDERS */}

      <h2>Orders</h2>

      <div className="table-wrap">

        <table>

          <thead>

            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No orders found.
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    #{order.id}
                  </td>

                  <td>
                    {order.user?.email ||
                      "Unknown"}
                  </td>

                  <td>
                    ₹{order.totalAmount}
                  </td>

                  <td>
                    {order.paymentStatus ||
                      "PENDING"}
                  </td>

                  <td>

                    <select
                      value={
                        order.status ||
                        "PENDING"
                      }
                      onChange={(e) =>
                        changeStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >

                      {["PENDING", "CONFIRMED","SHIPPED","DELIVERED","CANCELLED"]
                      
                      .map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>

                      ))}

                    </select>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
