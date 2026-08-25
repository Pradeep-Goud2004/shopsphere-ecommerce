package com.example.ecommerce.controller;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;
import com.example.ecommerce.service.ProductService;
import com.example.ecommerce.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProductService products;
    private final CategoryRepository categories;
    private final AppUserRepository users;
    private final OrderService orders;

    public AdminController(ProductService products, CategoryRepository categories,
                           AppUserRepository users, OrderService orders) {
        this.products = products;
        this.categories = categories;
        this.users = users;
        this.orders = orders;
    }

    @GetMapping("/products")
    public List<Product> productList() {
        return products.all();
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product,
                                 @RequestParam Long categoryId) {
        return products.save(product, categoryId);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product,
                                 @RequestParam(required = false) Long categoryId) {
        return products.update(id, product, categoryId);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        products.delete(id);
    }

    @GetMapping("/categories")
    public List<Category> categoryList() {
        return categories.findAll();
    }

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category) {
        return categories.save(category);
    }

    @GetMapping("/users")
    public List<AppUser> users() {
        return users.findAll();
    }

    @GetMapping("/orders")
    public List<Order> orders() {
        return orders.allOrders();
    }

    @PutMapping("/orders/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id,
                                   @RequestParam OrderStatus status) {
        return orders.updateStatus(id, status);
    }
}
