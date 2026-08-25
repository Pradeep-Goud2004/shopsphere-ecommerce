import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    imageUrl: "",
    quantity: "",
    available: true,
  });

  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Unable to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!product.name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      setError("Enter a valid product price");
      return;
    }

    if (!product.quantity || Number(product.quantity) < 0) {
      setError("Enter a valid quantity");
      return;
    }

    if (!categoryId) {
      setError("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        quantity: Number(product.quantity),
        available: product.available,
      };

      await api.post(
        `/admin/products?categoryId=${categoryId}`,
        productData
      );

      setMessage("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        brand: "",
        price: "",
        imageUrl: "",
        quantity: "",
        available: true,
      });

      setCategoryId("");

      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (err) {
      console.error("Error adding product:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-card">

        <div className="add-product-header">
          <h1>Add New Product</h1>

          <p>
            Add a product directly from the admin dashboard.
          </p>
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Brand</label>

            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Product Image URL</label>

            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </div>

          {product.imageUrl && (
            <div className="image-preview">

              <p>Image Preview</p>

              <img
                src={product.imageUrl}
                alt="Product Preview"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />

            </div>
          )}

          <div className="available-box">

            <input
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={handleChange}
            />

            <label>
              Product Available
            </label>

          </div>

          <div className="button-group">

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProduct;