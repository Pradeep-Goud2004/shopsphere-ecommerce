package com.example.ecommerce.service;

import com.example.ecommerce.dto.CartRequest;
import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {
    private final CartItemRepository carts;
    private final ProductRepository products;
    private final AppUserRepository users;

    public CartService(CartItemRepository carts, ProductRepository products, AppUserRepository users) {
        this.carts = carts;
        this.products = products;
        this.users = users;
    }

    private AppUser user(String email) {
        return users.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public List<CartItem> get(String email) {
        return carts.findByUserId(user(email).getId());
    }

    public CartItem add(String email, CartRequest request) {
        AppUser user = user(email);
        Product product = products.findById(request.productId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (product.getQuantity() != null && request.quantity() > product.getQuantity()) {
            throw new IllegalArgumentException("Requested quantity is not available");
        }

        CartItem item = carts.findByUserIdAndProductId(user.getId(), product.getId())
                .orElse(CartItem.builder().user(user).product(product).quantity(0).build());

        item.setQuantity(item.getQuantity() + request.quantity());
        return carts.save(item);
    }

    public CartItem update(String email, Long productId, Integer quantity) {
        CartItem item = carts.findByUserIdAndProductId(user(email).getId(), productId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (quantity <= 0) {
            carts.delete(item);
            return null;
        }
        item.setQuantity(quantity);
        return carts.save(item);
    }

    public void remove(String email, Long productId) {
        carts.findByUserIdAndProductId(user(email).getId(), productId).ifPresent(carts::delete);
    }

    @Transactional
    public void clear(String email) {
        carts.deleteByUserId(user(email).getId());
    }
}
