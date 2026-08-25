package com.example.ecommerce.controller;

import com.example.ecommerce.dto.CartRequest;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.service.CartService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping
    public List<CartItem> get(Authentication auth) {
        return service.get(auth.getName());
    }

    @PostMapping
    public CartItem add(Authentication auth, @Valid @RequestBody CartRequest request) {
        return service.add(auth.getName(), request);
    }

    @PutMapping("/{productId}")
    public CartItem update(Authentication auth, @PathVariable Long productId,
                           @RequestParam Integer quantity) {
        return service.update(auth.getName(), productId, quantity);
    }

    @DeleteMapping("/{productId}")
    public void remove(Authentication auth, @PathVariable Long productId) {
        service.remove(auth.getName(), productId);
    }

    @DeleteMapping
    public void clear(Authentication auth) {
        service.clear(auth.getName());
    }
}
