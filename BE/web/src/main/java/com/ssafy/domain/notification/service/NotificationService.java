package com.ssafy.domain.notification.service;

import com.ssafy.domain.notification.dto.request.DeleteNotificationRequest;
import com.ssafy.domain.notification.dto.request.NotificationRequest;
import com.ssafy.domain.notification.dto.response.NotificationListRespones;
import com.ssafy.domain.notification.dto.response.NotificationResponse;
import com.ssafy.domain.notification.entity.Notification;
import com.ssafy.domain.follow.entity.Follow;
import com.ssafy.domain.follow.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {
    private final FollowRepository followRepository;
    private final MongoTemplate mongoTemplate;

    public NotificationListRespones read(String recipient){
        List<Notification>notifications = mongoTemplate.find(new Query(Criteria.where("recipient").is(recipient)), Notification.class);
//        log.info("notification List = {}", notifications.get(0).getSender());
        return new NotificationListRespones(notifications);
    }
    public Boolean check(String recipient){
        Criteria criteria = new Criteria();
        criteria.andOperator(
                Criteria.where("recipient").is(recipient),
                Criteria.where("read").is(false)
        );
        List<Notification>notifications = mongoTemplate.find(new Query(criteria), Notification.class);
        if(notifications.size() == 0){
            return false;
        }else{
            return true;
        }
    }
    public NotificationResponse create(NotificationRequest request){
        if(request.type().equals("apply") || request.type().equals("result")){
            // 신청자 || 신청 결과 알려주기
            Notification notification = Notification.from(request, request.recipient(), request.recipientNickname());
            mongoTemplate.insert(notification);
        }else{
            // 팔로우 조회 insert
            List<Follow> list = followRepository.findByFolloweeId(request.sender());
            List<Notification> notifications = new ArrayList<>();
            for(int i = 0; i < list.size(); i++){
                Notification notification = Notification.from(request, list.get(i).getFollower().getId(), list.get(i).getFollower().getNickname());
                notifications.add(notification);
            }
            mongoTemplate.insertAll(notifications);
        }
        return new NotificationResponse("SUCCESS");
    }

    public NotificationResponse delete(String id){
        mongoTemplate.remove(new Query(Criteria.where("_id").is(id)), Notification.class);
        return new NotificationResponse("SUCCESS");
    }
    public NotificationResponse deleteAll(String recipient){
        Criteria criteria = new Criteria();
        criteria.andOperator(
            Criteria.where("recipient").is(recipient),
            new Criteria().orOperator(
                    Criteria.where("type").is("coaching"),
                    Criteria.where("type").is("learning"),
                    Criteria.where("type").is("companion")
            )
        );
        try{
            mongoTemplate.remove(new Query(criteria), Notification.class);
        }catch (IllegalArgumentException e){
            e.printStackTrace();
        }
        return new NotificationResponse("SUCCESS");
    }

    public NotificationResponse update(String recipient){
        Query query = new Query(Criteria.where("recipient").is(recipient));
        Update update = new Update()
                .set("read", true);
        mongoTemplate.updateMulti(query, update, Notification.class);
        return new NotificationResponse("SUCCESS");
    }

}
