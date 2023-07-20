package com.ssafy.Exception.model;

import com.ssafy.Exception.message.ExceptionMessage;

public class UserAuthException extends RuntimeException {
    public UserAuthException(String error) {
        super(error);
    }

    public UserAuthException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.message());
    }
}
