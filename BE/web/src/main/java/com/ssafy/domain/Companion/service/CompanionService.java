package com.ssafy.domain.Companion.service;




import com.ssafy.domain.Companion.dto.request.CompanionCreate;
import com.ssafy.domain.Companion.dto.request.CompanionUpdate;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Companion.repository.CompanionRepository;
import com.ssafy.domain.Member.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionService {

    private final CompanionRepository companionRepository;
    private final MemberService memberService;

    //컴패니언 생성
    @Transactional
    public Companion createComapnion(CompanionCreate companionCreate, String memberId){
        return companionRepository.save(companionCreate.toCompanion(memberService.findByMemberId(memberId)));
    }

//    @Transactional
//    public Companion updateCompanion(CompanionUpdate companionUpdate, Long CompanionId){
//        companionRepository.findById(CompanionId)
//                .ifPresentOrElse(companion -> companion.update(companionUpdate.title(), companionUpdate.contents(), companionUpdate.field(), companionUpdate.teeBox(), companionUpdate.aimPeople(), companionUpdate.teeupDate(), companionUpdate.endDate()),
//                        () -> {throw new EntityNotFoundException();});
//
//        return findById(companionId);
//    }

    //companion 수정
    @Transactional
    public Companion updateCompanion(CompanionUpdate companionUpdate, Long companionId) {
        Companion companion = companionRepository.findById(companionId)
                .orElseThrow(EntityNotFoundException::new);

        companion.update(
                companionUpdate.title(),   // 이 부분을 companionUpdate.getTitle()에서 companionUpdate.title()로 수정
                companionUpdate.contents(),
                companionUpdate.field(),
                companionUpdate.teeBox(),
                companionUpdate.aimPeople(),
                LocalDateTime.parse(companionUpdate.teeupDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                LocalDateTime.parse(companionUpdate.endDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
        return companionRepository.save(companion);
    }



    //CompanionUser status가 + ture 가 되면 currentPeople 이 1 증가해야함




}
