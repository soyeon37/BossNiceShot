package com.ssafy.Exception.model;


import com.ssafy.Exception.message.ExceptionMessage;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException(String error) {
        super(error);
    }

    public TokenNotFoundException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.message());
    }
}
