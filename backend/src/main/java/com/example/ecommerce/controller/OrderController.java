package com.example.ecommerce.controller;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.OrderResponse;
import com.example.ecommerce.dto.PaymentRequest;
import com.example.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public OrderResponse place(
            Authentication auth,
            @Valid @RequestBody OrderRequest request) {

        return service.place(
                auth.getName(),
                request
        );
    }

    @GetMapping("/my")
    public List<OrderResponse> mine(
            Authentication auth) {

        return service.myOrders(
                auth.getName()
        );
    }

    @PostMapping("/{id}/payment")
    public OrderResponse payment(
            @PathVariable Long id,
            @RequestBody PaymentRequest request) {

        return service.markPaid(
                id,
                request.paymentReference()
        );
    }
}