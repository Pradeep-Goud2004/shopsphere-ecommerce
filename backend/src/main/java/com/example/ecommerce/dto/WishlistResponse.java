package com.example.ecommerce.dto;

public class WishlistResponse {

    private Long id;

    private WishlistProductResponse product;

    public WishlistResponse() {
    }

    public WishlistResponse(
            Long id,
            WishlistProductResponse product) {

        this.id = id;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WishlistProductResponse getProduct() {
        return product;
    }

    public void setProduct(
            WishlistProductResponse product) {

        this.product = product;
    }
}
