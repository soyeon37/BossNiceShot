package com.ssafy.config.webRtc;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

//    private final WebsocketSecurityInterceptor websocketSecurityInterceptor;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        //해당 파라미터의 접두사가 붙은 사람에게 메세지를 보낼
        registry.enableSimpleBroker("/chat");

        //전역적인 주소 접두사 지정하기 싫으면 ("/") 로 두면 된다
        registry.setApplicationDestinationPrefixes("/app");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        //엔드포인트 추가 등록
        registry.addEndpoint("/end-websocket")
                .addInterceptors()
                .setAllowedOriginPatterns("*")
                //소캣JS로 개발되었을때 필요한 것 (앱통신시 필요없다나)
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration){
        registration.interceptors();
        //아직 다 안씀
    }
}
