package com.example.ecommerce.service;

import com.example.ecommerce.entity.Category;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository products;
    private final CategoryRepository categories;

    public ProductService(ProductRepository products, CategoryRepository categories) {
        this.products = products;
        this.categories = categories;
    }

    public List<Product> all() {
        return products.findAll();
    }

    public Product get(Long id) {
        return products.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public List<Product> search(String q) {
        return q == null || q.isBlank() ? all() : products.search(q.trim());
    }

    public List<Product> byCategory(Long categoryId) {
        return products.findByCategoryId(categoryId);
    }

    public Product save(Product product, Long categoryId) {
        Category category = categories.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        product.setCategory(category);
        return products.save(product);
    }

    public Product update(Long id, Product input, Long categoryId) {
        Product existing = get(id);
        existing.setName(input.getName());
        existing.setDescription(input.getDescription());
        existing.setBrand(input.getBrand());
        existing.setPrice(input.getPrice());
        existing.setImageUrl(input.getImageUrl());
        existing.setQuantity(input.getQuantity());
        existing.setAvailable(input.getAvailable());
        if (categoryId != null) {
            existing.setCategory(categories.findById(categoryId)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found")));
        }
        return products.save(existing);
    }

    public void delete(Long id) {
        products.deleteById(id);
    }
}
