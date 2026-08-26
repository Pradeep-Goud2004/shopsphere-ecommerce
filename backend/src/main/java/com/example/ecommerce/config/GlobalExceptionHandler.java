package com.example.ecommerce.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> badRequest(IllegalArgumentException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        ex.getMessage()
                ));
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validation(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error ->
                        error.getField() + ": " +
                        error.getDefaultMessage()
                )
                .orElse("Validation failed");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        message
                ));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> generic(Exception ex) {

        // Log the real exception on the backend.
        ex.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Internal server error"
                ));
    }


    private Map<String, Object> errorResponse(
            int status,
            String message) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", status);
        response.put("message",
                message != null
                        ? message
                        : "Unknown error");

        return response;
    }
}