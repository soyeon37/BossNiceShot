package com.ssafy.Exception.model;

import com.ssafy.Exception.message.ExceptionMessage;

public class UserException extends RuntimeException{
    public UserException(String error) {
        super(error);
    }

    public UserException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.message());
    }
}
