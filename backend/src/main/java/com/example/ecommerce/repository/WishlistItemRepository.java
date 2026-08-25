package com.example.ecommerce.repository;

import com.example.ecommerce.entity.AppUser;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.WishlistItem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long>
         {List<WishlistItem> findByUser(AppUser user);

    Optional<WishlistItem> findByUserAndProduct(AppUser user,Product product);
    
    void deleteByUserAndProduct( AppUser user,Product product);
    
    boolean existsByUserAndProduct(AppUser user,Product product);
    
}