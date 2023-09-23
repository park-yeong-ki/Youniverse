package com.ssafy.youniverse.handler.exception;

public class InvalidAccessTokenException extends RuntimeException{

    public static final String INVALID_ACCESS_TOKEN = "유효하지 않은 토큰입니다.";

    public InvalidAccessTokenException(String message){
        super(message);
    }
}
