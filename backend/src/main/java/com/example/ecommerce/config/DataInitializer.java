package com.example.ecommerce.config;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(
            AppUserRepository users,
            CategoryRepository categories,
            ProductRepository products,
            PasswordEncoder encoder) {

        return args -> {

            // ==========================================
            // ADMIN USER
            // ==========================================

            if (!users.existsByEmail("admin@example.com")) {

                users.save(
                        AppUser.builder()
                                .name("Administrator")
                                .email("admin@example.com")
                                .password(encoder.encode("Admin@123"))
                                .role(Role.ADMIN)
                                .build()
                );
            }


            // ==========================================
            // CATEGORIES
            // ==========================================

            Category electronics =
                    categories.findAll()
                            .stream()
                            .filter(c -> c.getName()
                                    .equalsIgnoreCase("Electronics"))
                            .findFirst()
                            .orElseGet(() ->
                                    categories.save(
                                            Category.builder()
                                                    .name("Electronics")
                                                    .build()
                                    )
                            );

            Category fashion =
                    categories.findAll()
                            .stream()
                            .filter(c -> c.getName()
                                    .equalsIgnoreCase("Fashion"))
                            .findFirst()
                            .orElseGet(() ->
                                    categories.save(
                                            Category.builder()
                                                    .name("Fashion")
                                                    .build()
                                    )
                            );

            Category home =
                    categories.findAll()
                            .stream()
                            .filter(c -> c.getName()
                                    .equalsIgnoreCase("Home"))
                            .findFirst()
                            .orElseGet(() ->
                                    categories.save(
                                            Category.builder()
                                                    .name("Home")
                                                    .build()
                                    )
                            );


            // ==========================================
            // WIRELESS HEADPHONES
            // ==========================================

            if (products.findAll()
                    .stream()
                    .noneMatch(p -> p.getName()
                            .equalsIgnoreCase("Wireless Headphones"))) {

                products.save(
                        Product.builder()
                                .name("Wireless Headphones")
                                .brand("SoundMax")
                                .description(
                                        "Bluetooth over-ear wireless headphones with clear sound."
                                )
                                .price(new BigDecimal("2799.00"))
                                .quantity(50)
                                .available(true)
                                .imageUrl(
                                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                                )
                                .category(electronics)
                                .build()
                );
            }


            // ==========================================
            // CLASSIC T-SHIRT
            // ==========================================

            if (products.findAll()
                    .stream()
                    .noneMatch(p -> p.getName()
                            .equalsIgnoreCase("Classic T-Shirt"))) {

                products.save(
                        Product.builder()
                                .name("Classic T-Shirt")
                                .brand("UrbanWear")
                                .description(
                                        "Comfortable cotton everyday t-shirt."
                                )
                                .price(new BigDecimal("699.00"))
                                .quantity(100)
                                .available(true)
                                .imageUrl(
                                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                                )
                                .category(fashion)
                                .build()
                );
            }


            // ==========================================
            // DESK LAMP
            // ==========================================

            if (products.findAll()
                    .stream()
                    .noneMatch(p -> p.getName()
                            .equalsIgnoreCase("Desk Lamp"))) {

                products.save(
                        Product.builder()
                                .name("Desk Lamp")
                                .brand("HomeLite")
                                .description(
                                        "Minimal LED desk lamp for work and study."
                                )
                                .price(new BigDecimal("1299.00"))
                                .quantity(40)
                                .available(true)
                                .imageUrl(
                                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
                                )
                                .category(home)
                                .build()
                );
            }


            // ==========================================
            // SPORTS SHOE
            // ==========================================

            if (products.findAll()
                    .stream()
                    .noneMatch(p -> p.getName()
                            .equalsIgnoreCase("Sports Shoe"))) {

                products.save(
                        Product.builder()
                                .name("Sports Shoe")
                                .brand("Nike")
                                .description(
                                        "Nike sports shoes are designed for comfort, performance, and style. " +
                                        "They feature a lightweight construction, cushioned sole, breathable upper, " +
                                        "and excellent grip, making them suitable for running, gym workouts, " +
                                        "training, walking, and everyday sports activities."
                                )
                                .price(new BigDecimal("3651.99"))
                                .quantity(10)
                                .available(true)
                                .imageUrl(
                                        "https://assets.ajio.com/medias/sys_master/root1/20250716/aATt/687795315d4cb41380174a82/-473Wx593H-469759339-white-MODEL.jpg"
                                )
                                .category(fashion)
                                .build()
                );
            }

        };
    }
}