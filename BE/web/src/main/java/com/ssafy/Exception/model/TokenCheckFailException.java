package com.ssafy.Exception.model;


import com.ssafy.Exception.message.ExceptionMessage;

public class TokenCheckFailException extends RuntimeException {
    public TokenCheckFailException(String error) {
        super(error);
    }

    public TokenCheckFailException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.message());
    }
}
