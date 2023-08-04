package com.ssafy.domain.Companion.service;




import com.ssafy.domain.Companion.dto.request.CompanionCreate;
import com.ssafy.domain.Companion.dto.request.CompanionUpdate;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Companion.repository.CompanionRepository;
import com.ssafy.domain.Member.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    //companion 생성
    @Transactional
    public Companion createComapnion(CompanionCreate companionCreate, String memberId){
        return companionRepository.save(companionCreate.toCompanion(memberService.findByMemberId(memberId)));
    }

    //companion 수정
    @Transactional
    public Companion updateCompanion(CompanionUpdate companionUpdate, Long companionId) {
        Companion companion = companionRepository.findById(companionId)
                .orElseThrow(EntityNotFoundException::new);

        companion.update(
                companionUpdate.title(),
                companionUpdate.contents(),
                companionUpdate.field(),
                companionUpdate.teeBox(),
                companionUpdate.aimPeople(),
                LocalDateTime.parse(companionUpdate.teeupDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                LocalDateTime.parse(companionUpdate.endDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
        return companionRepository.save(companion);
    }

    //companion 삭제
    @Transactional
    public void deleteCompanion(Long companionId){
        companionRepository.deleteById(companionId);
    }

    //companion 을 프런트 단에 보내는 것 - 컴패니언 전체 다 보여주는
    @Transactional(readOnly = true)
    public Companion findByCompanionId(Long companionId) {
        return companionRepository.findById(companionId).orElseThrow(EntityNotFoundException::new);
    }



//    public Page<Companion> findPagingByKeyword(Pageable pageable, )



    // 컴패니언 눌러서 나오는 상세 내용 하나씩 보여주는
    // current people == aimpeople 같아 지면 (전체 보내고 프런트에서 비교해서 )

    //CompanionUser status가 엑티브가 되면 currentPeople 이 1 증가해야함
    // 컴패니언 유저 정보가 다시 사라지면 다시 줄어들고


    //검색 필터 해야하고
    //검색 키워드로 해서 받아오는 것 (검색 필터는 전체 조회할떄)


}
