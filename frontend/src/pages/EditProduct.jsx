import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [id]);

  // ==============================
  // LOAD PRODUCT
  // ==============================

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      const data = response.data;

      setProduct({
        name: data.name || "",
        description: data.description || "",
        brand: data.brand || "",
        price: data.price || "",
        imageUrl: data.imageUrl || "",
        quantity: data.quantity ?? "",
        available: data.available ?? true,
      });

      setCategoryId(
        data.category?.id
          ? String(data.category.id)
          : ""
      );

    } catch (err) {
      console.error("Error loading product:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD CATEGORIES
  // ==============================

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==============================
  // UPDATE PRODUCT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!product.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (
      !product.price ||
      Number(product.price) <= 0
    ) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      product.quantity === "" ||
      Number(product.quantity) < 0
    ) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    try {
      setUpdating(true);

      const updatedProduct = {
        name: product.name.trim(),

        description:
          product.description.trim(),

        brand:
          product.brand.trim(),

        price:
          Number(product.price),

        imageUrl:
          product.imageUrl.trim(),

        quantity:
          Number(product.quantity),

        available:
          product.available,
      };

      await api.put(
        `/admin/products/${id}?categoryId=${categoryId}`,
        updatedProduct
      );

      setMessage(
        "Product updated successfully!"
      );

      setTimeout(() => {
        navigate("/admin");
      }, 1200);

    } catch (err) {
      console.error(
        "Error updating product:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to update product."
      );

    } finally {
      setUpdating(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="edit-product-loading">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <div className="edit-product-page">

      <div className="edit-product-card">

        <div className="edit-product-header">

          <div>
            <h1>Edit Product</h1>

            <p>
              Update the product information below.
            </p>
          </div>

          <span className="product-id">
            Product ID: {id}
          </span>

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

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />

          </div>

          {/* BRAND */}

          <div className="form-group">

            <label>
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="6"
            />

          </div>

          {/* PRICE + QUANTITY */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />

            </div>

            <div className="form-group">

              <label>
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                min="0"
                required
              />

            </div>

          </div>

          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
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

          {/* IMAGE URL */}

          <div className="form-group">

            <label>
              Product Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />

          </div>

          {/* IMAGE PREVIEW */}

          {product.imageUrl && (

            <div className="edit-image-preview">

              <p>
                Current Image
              </p>

              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />

            </div>

          )}

          {/* AVAILABLE */}

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

          {/* BUTTONS */}

          <div className="edit-button-group">

            <button
              type="submit"
              disabled={updating}
            >
              {updating
                ? "Updating Product..."
                : "Update Product"}
            </button>

            <button
              type="button"
              className="edit-cancel-button"
              onClick={() =>
                navigate("/admin")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;