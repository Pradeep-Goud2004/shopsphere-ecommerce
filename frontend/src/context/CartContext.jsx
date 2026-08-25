import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      const { data } = await api.get("/cart");
      setCart(data);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => { loadCart(); }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    await api.post("/cart", { productId, quantity });
    await loadCart();
  };

  const updateQuantity = async (productId, quantity) => {
    await api.put(`/cart/${productId}?quantity=${quantity}`);
    await loadCart();
  };

  const removeFromCart = async (productId) => {
    await api.delete(`/cart/${productId}`);
    await loadCart();
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart, loadCart, addToCart, updateQuantity, removeFromCart, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
