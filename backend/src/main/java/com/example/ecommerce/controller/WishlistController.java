// package com.example.ecommerce.controller;

// import com.example.ecommerce.entity.WishlistItem;
// import com.example.ecommerce.service.WishlistService;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/wishlist")
// public class WishlistController {
//     private final WishlistService service;

//     public WishlistController(WishlistService service) {
//         this.service = service;
//     }

//     @GetMapping
//     public List<WishlistItem> get(Authentication auth) {
//         return service.get(auth.getName());
//     }

//     @PostMapping("/{productId}")
//     public WishlistItem toggle(Authentication auth, @PathVariable Long productId) {
//         return service.toggle(auth.getName(), productId);
//     }
// }



package com.example.ecommerce.controller;

import com.example.ecommerce.dto.WishlistResponse;
import com.example.ecommerce.entity.WishlistItem;
import com.example.ecommerce.service.WishlistService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(
            WishlistService wishlistService) {

        this.wishlistService =wishlistService;
    }


    @PostMapping("/{productId}")
    public ResponseEntity<String> addToWishlist( @PathVariable Long productId,  Authentication authentication) {

        String email =authentication.getName();
          wishlistService.addToWishlist( email,productId);

        return ResponseEntity.ok( "Product added to wishlist");
    }


    @GetMapping
    public ResponseEntity<List<WishlistResponse>> getWishlist(Authentication authentication) {

        String email =authentication.getName();
            List<WishlistResponse> wishlist = wishlistService.getWishlist( email);
             
             return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFromWishlist( @PathVariable Long productId,Authentication authentication) {

        String email = authentication.getName();
             wishlistService.removeFromWishlist( email,productId);  
           return ResponseEntity.ok("Product removed from wishlist");
            
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Boolean> checkWishlist( @PathVariable Long productId, Authentication authentication) {
               String email = authentication.getName();
                 boolean exists = wishlistService.isInWishlist(email,productId);
                
        return ResponseEntity.ok(exists);
    }
}