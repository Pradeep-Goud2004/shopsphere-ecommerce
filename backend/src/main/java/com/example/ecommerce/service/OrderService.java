package com.example.ecommerce.service;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.OrderResponse;
import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orders;
    private final CartItemRepository carts;
    private final AppUserRepository users;
    private final ProductRepository products;

    public OrderService(
            OrderRepository orders,
            CartItemRepository carts,
            AppUserRepository users,
            ProductRepository products) {

        this.orders = orders;
        this.carts = carts;
        this.users = users;
        this.products = products;
    }

    private AppUser user(String email) {

        return users.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        ));
    }

    @Transactional
    public OrderResponse place(
            String email,
            OrderRequest request) {

        AppUser user = user(email);

        List<CartItem> cartItems =
                carts.findByUserId(user.getId());

        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException(
                    "Cart is empty"
            );
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(
                        request.shippingAddress()
                )
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> items =
                new ArrayList<>();

        for (CartItem cart : cartItems) {

            Product product =
                    cart.getProduct();

            if (product.getQuantity() != null &&
                    cart.getQuantity()
                            > product.getQuantity()) {

                throw new IllegalArgumentException(
                        "Insufficient stock for "
                                + product.getName()
                );
            }

            BigDecimal line =
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            cart.getQuantity()
                                    )
                            );

            total = total.add(line);

            OrderItem orderItem =
                    OrderItem.builder()
                            .order(order)
                            .product(product)
                            .quantity(
                                    cart.getQuantity()
                            )
                            .unitPrice(
                                    product.getPrice()
                            )
                            .build();

            items.add(orderItem);

            if (product.getQuantity() != null) {

                product.setQuantity(
                        product.getQuantity()
                                - cart.getQuantity()
                );

                product.setAvailable(
                        product.getQuantity() > 0
                );

                products.save(product);
            }
        }

        order.setTotalAmount(total);
        order.setItems(items);

        Order saved =
                orders.save(order);
         carts.deleteByUserId(user.getId());
        carts.deleteByUserId(
                user.getId()
        );

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> myOrders(
            String email) {

        AppUser user = user(email);

        List<Order> orderList =
                orders.findByUserIdOrderByCreatedAtDesc(
                        user.getId()
                );

        return orderList.stream()
                .map(this::toResponse)
                .toList();
    }

    public List<Order> allOrders() {
        return orders.findAll();
    }

    public Order updateStatus(
            Long id,
            OrderStatus status) {

        Order order =
                orders.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Order not found"
                                ));

        order.setStatus(status);

        return orders.save(order);
    }

    public OrderResponse markPaid(
            Long id,
            String reference) {

        Order order =
                orders.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Order not found"
                                ));

        order.setPaymentStatus(
                PaymentStatus.PAID
        );

        order.setPaymentReference(
                reference
        );

        order.setStatus(
                OrderStatus.CONFIRMED
        );

        Order saved =
                orders.save(order);

        return toResponse(saved);
    }

    private OrderResponse toResponse(
            Order order) {

        return new OrderResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getPaymentStatus(),
                order.getPaymentReference(),
                order.getShippingAddress(),
                order.getCreatedAt()
        );
    }
}