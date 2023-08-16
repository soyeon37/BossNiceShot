package com.ssafy.domain.companion.service;

import com.ssafy.domain.companion.dto.request.CompanionCreateRequest;
import com.ssafy.domain.companion.dto.request.CompanionSearchRequest;
import com.ssafy.domain.companion.dto.request.CompanionUpdateRequest;
import com.ssafy.domain.companion.entity.Companion;
import com.ssafy.domain.companion.repository.CompanionRepository;
import com.ssafy.domain.member.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionService {
    private final CompanionRepository companionRepository;
    private final MemberService memberService;

    @Transactional
    public Companion createCompanion(CompanionCreateRequest companionCreateRequest, String memberId){
        return companionRepository.save(companionCreateRequest.toCompanion(memberService.findByMemberId(memberId)));
    }

    @Transactional
    public Companion updateCompanion(CompanionUpdateRequest companionUpdateRequest, Long companionId) {
        companionRepository.findById(companionId)
                .ifPresentOrElse(companion -> companion.update(
                        companionUpdateRequest.title(),
                        companionUpdateRequest.description(),
                        companionUpdateRequest.field(),
                        companionUpdateRequest.teeBox(),
                        companionUpdateRequest.capacity(),
                        LocalDateTime.parse(companionUpdateRequest.teeUpTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))),
                        () -> { throw new EntityNotFoundException(); });

        return findById(companionId);
    }

    @Transactional
    public void deleteById(Long companionId){
        companionRepository.deleteById(companionId);
    }

    public Companion findById(Long companionId) {
        return companionRepository.findById(companionId).orElseThrow(EntityNotFoundException::new);
    }

    public Page<Companion> findPaging(Pageable pageable){
        return companionRepository.findPaging(pageable);
    }

    public Page<Companion> findPagingByKeyword(CompanionSearchRequest companionSearchRequest, Pageable pageable){
        return companionRepository.searchAll(companionSearchRequest, pageable);
    }

    public List<Companion> findParticipatingCompanionByCompanionUserMemberId(String companionUserMemberId) {
        return companionRepository.findParticipatingCompanionByCompanionUserMemberId(companionUserMemberId);
    }

    public List<Companion> findCreatedCompanionByMemberId(String memberId) {
        return companionRepository.findCreatedCompanionByMemberId(memberId);
    }

    public List<Companion> findPastByCompanionUserMemberId(String memberId) {
        return companionRepository.findPastByCompanionUserMemberId(memberId);
    }

    public List<Integer> findFieldOrderByCountDesc() {
        return companionRepository.findFieldOrderByCountDesc();
    }

    public List<Companion> findOrderByCreatedTimeLimitFive() {
        return companionRepository.findOrderByCreatedTimeLimitFive();
    }
}
