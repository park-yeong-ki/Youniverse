package com.ssafy.youniverse.handler;

import com.ssafy.youniverse.handler.exception.InvalidAccessTokenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler  {

    // 사용자 정의 예외
    @ExceptionHandler(InvalidAccessTokenException.class)
    public ResponseEntity<?> handleRuntimeException(Exception e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}