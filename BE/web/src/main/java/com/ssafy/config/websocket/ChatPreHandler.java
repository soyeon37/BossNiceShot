package com.ssafy.config.websocket;

import com.ssafy.config.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatPreHandler implements ChannelInterceptor {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

        log.info("WebSocket command:{}", headerAccessor.getCommand());

        if (StompCommand.CONNECT == headerAccessor.getCommand()) {
            String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
            log.info("WebSocket authorizationHeader:{}", authorizationHeader);

            String token = authorizationHeader.substring(7);

            if (!jwtTokenProvider.validateToken(token)) {
                throw new MessageDeliveryException("메세지 에러");
            }
        }

        return message;
    }

}
