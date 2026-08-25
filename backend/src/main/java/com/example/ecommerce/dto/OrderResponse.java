package com.example.ecommerce.dto;

import com.example.ecommerce.entity.OrderStatus;
import com.example.ecommerce.entity.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponse(
        Long id,
        BigDecimal totalAmount,
        OrderStatus status,
        PaymentStatus paymentStatus,
        String paymentReference,
        String shippingAddress,
        LocalDateTime createdAt
) {
}