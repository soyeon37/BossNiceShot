package com.ssafy.domain.study.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.study.dto.request.CoachingCreateRequest;
import com.ssafy.domain.study.dto.request.CoachingUpdateRequest;
import com.ssafy.domain.study.entity.Coaching;
import com.ssafy.domain.study.repository.CoachingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoachingService {
    private final CoachingRepository coachingRepository;
    private final MemberService memberService;

    @Transactional
    public Coaching create(CoachingCreateRequest coachingCreateRequest, String memberId) {
        return coachingRepository.save(coachingCreateRequest.toCoaching(memberService.findByMemberId(memberId)));
    }

    @Transactional
    public Coaching update(CoachingUpdateRequest coachingUpdateRequest, Long studyId) {
        coachingRepository.findById(studyId)
                .ifPresentOrElse(coaching -> coaching.update(coachingUpdateRequest.title(), coachingUpdateRequest.description(), coachingUpdateRequest.password(), coachingUpdateRequest.reservedTime(), coachingUpdateRequest.capacity()),
                        () -> { throw new EntityNotFoundException(); });

        return findById(studyId);
    }

    @Transactional
    public void deleteById(Long studyId) {
        coachingRepository.deleteById(studyId);
    }

    public Coaching findById(Long studyId) {
        return coachingRepository.findById(studyId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Coaching> findAllByCreatedTimeDesc() {
        return coachingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTime"));
    }

    public List<Coaching> findEnableCoaching() {
        return coachingRepository.findEnableCoaching(Sort.by(Sort.Direction.DESC, "reservedTime"));
    }

    public List<Coaching> findByTitleContaining(String keword) {
        return coachingRepository.findByTitleContaining(keword, Sort.by(Sort.Direction.DESC, "createdTime"));
    }

    public List<Coaching> findByMemberIdContaining(String keword) {
        return coachingRepository.findByMemberIdContaining(keword, Sort.by(Sort.Direction.DESC, "createdTime"));
    }

    public List<Coaching> findByTitleContainingOrDescriptionContaining(String keyword) {
        return coachingRepository.findByTitleContainingOrDescriptionContaining(keyword, Sort.by(Sort.Direction.DESC, "createdTime"));
    }
}
