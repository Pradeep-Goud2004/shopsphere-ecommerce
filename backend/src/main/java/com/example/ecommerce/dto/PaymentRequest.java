package com.example.ecommerce.dto;

import jakarta.validation.constraints.NotNull;

public record PaymentRequest(
    @NotNull Long orderId,
    String paymentReference
) {}
