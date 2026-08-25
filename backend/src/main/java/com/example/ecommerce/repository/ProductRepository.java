package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    @Query("""
        select p from Product p
        where lower(p.name) like lower(concat('%', :q, '%'))
           or lower(coalesce(p.brand, '')) like lower(concat('%', :q, '%'))
           or lower(coalesce(p.description, '')) like lower(concat('%', :q, '%'))
        """)
    List<Product> search(@Param("q") String q);
}
