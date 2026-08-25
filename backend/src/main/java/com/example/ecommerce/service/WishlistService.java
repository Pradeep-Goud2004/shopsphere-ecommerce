package com.example.ecommerce.service;

import com.example.ecommerce.dto.WishlistProductResponse;
import com.example.ecommerce.dto.WishlistResponse;
import com.example.ecommerce.entity.AppUser;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.WishlistItem;
import com.example.ecommerce.repository.AppUserRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.WishlistItemRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistItemRepository wishlistRepository;
    private final AppUserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(
            WishlistItemRepository wishlistRepository,
            AppUserRepository userRepository,
            ProductRepository productRepository) {

        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }



    @Transactional
    public void addToWishlist(String email,Long productId) {

        AppUser user = userRepository
                .findByEmail(email).orElseThrow(() -> new RuntimeException( "User not found: " + email));
        

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->new RuntimeException( "Product not found: " + productId));


        // Check if product already exists
        boolean alreadyExists =
                wishlistRepository.existsByUserAndProduct(user,product);
               


        // Don't create duplicate
        if (alreadyExists) {
            return;
        }


        // Create wishlist item
        WishlistItem item =
                new WishlistItem();

        item.setUser(user);
        item.setProduct(product);


        wishlistRepository.save(item);
    }


    @Transactional(readOnly = true)
    public List<WishlistResponse> getWishlist(
            String email) {

        AppUser user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->new RuntimeException( "User not found: " + email));
        
        List<WishlistItem> items =
                wishlistRepository.findByUser(user);


        // Convert entities to DTOs
        return items.stream()
                .map(this::convertToResponse).toList();
    }


    private WishlistResponse convertToResponse(
            WishlistItem item) {

        Product product =item.getProduct();


        WishlistProductResponse productResponse =
                new WishlistProductResponse(

                        product.getId(),

                        product.getName(),

                        product.getBrand(),

                        product.getDescription(),

                        product.getPrice(),

                        product.getImageUrl()
                );


        return new WishlistResponse(
                item.getId(),
                productResponse
        );
    }


    @Transactional
    public void removeFromWishlist(
            String email,
            Long productId) {

        AppUser user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->new RuntimeException("User not found: " + email));
            
        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->new RuntimeException( "Product not found: " + productId));
        

        WishlistItem item =
                wishlistRepository
                        .findByUserAndProduct(user,product)

                        .orElseThrow(() ->new RuntimeException("Product is not in wishlist"));

        wishlistRepository.delete(item);
    }



    @Transactional(readOnly = true)
    public boolean isInWishlist(
            String email,
            Long productId) {

        AppUser user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->new RuntimeException("Product not found: " + productId));
            
        return wishlistRepository.existsByUserAndProduct(user,product);
           
    }
}