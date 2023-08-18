package com.ssafy.domain.study.service;

import com.ssafy.domain.member.service.MemberService;
import com.ssafy.domain.study.dto.request.StudyCreateRequest;
import com.ssafy.domain.study.dto.request.StudySearchRequest;
import com.ssafy.domain.study.dto.request.StudyUpdateRequest;
import com.ssafy.domain.study.entity.Study;
import com.ssafy.domain.study.entity.StudyType;
import com.ssafy.domain.study.repository.StudyRepository;
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
public class StudyService {
    private final StudyRepository studyRepository;
    private final MemberService memberService;

    @Transactional
    public Study create(StudyCreateRequest studyCreateRequest, String memberId) {
        return studyRepository.save(studyCreateRequest.toStudy(memberService.findByMemberId(memberId)));
    }

    @Transactional
    public Study update(StudyUpdateRequest studyUpdateRequest, Long studyId) {
        studyRepository.findById(studyId)
                .ifPresentOrElse(study -> study.update(studyUpdateRequest.title(), studyUpdateRequest.description(), LocalDateTime.parse(studyUpdateRequest.reservedTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), studyUpdateRequest.capacity(), studyUpdateRequest.locked(), studyUpdateRequest.password()),
                        () -> { throw new EntityNotFoundException(); });

        return findById(studyId);
    }

    @Transactional
    public void deleteById(Long studyId) {
        studyRepository.deleteById(studyId);
    }

    @Transactional
    public Study active(Long studyId) {
        studyRepository.findById(studyId)
                .ifPresentOrElse(Study::active,
                        () -> { throw new EntityNotFoundException(); });

        return findById(studyId);
    }

    public Study findById(Long studyId) {
        return studyRepository.findById(studyId).orElseThrow(EntityNotFoundException::new);
    }

    public Page<Study> findPaging(Pageable pageable, String type) {
        return studyRepository.findPagingByType(pageable, StudyType.valueOf(type));
    }

    public Page<Study> findByKeyword(Pageable pageable, String type, StudySearchRequest studySearchRequest) {
        if (studySearchRequest.category().equals("title")) {
            return studyRepository.findPagingByTypeAndTitleContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }
        if (studySearchRequest.category().equals("nickname")) {
            return studyRepository.findPagingByTypeAndMemberNickNameContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }
        if (studySearchRequest.category().equals("titleAndDescription")) {
            return studyRepository.findPagingByTypeAndTitleContainingOrDescriptionContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }

        throw new EntityNotFoundException();
    }

    public Page<Study> findPagingAttandableCoaching(Pageable pageable, String type) {
        return studyRepository.findPagingAttandableByType(pageable, StudyType.valueOf(type));
    }

    public Page<Study> findAttandableCoachingByKeyword(Pageable pageable, String type, StudySearchRequest studySearchRequest) {
        if (studySearchRequest.category().equals("title")) {
            return studyRepository.findPagingAttandableByTypeAndTitleContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }
        if (studySearchRequest.category().equals("nickname")) {
            return studyRepository.findPagingAttandableByTypeAndMemberNickNameContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }
        if (studySearchRequest.category().equals("titleAndDescription")) {
            return studyRepository.findPagingAttandableByTypeAndTitleContainingOrDescriptionContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
        }

        throw new EntityNotFoundException();
    }

    public List<Study> findOrderByCreatedTimeLimitFive() {
        return studyRepository.findOrderByCreatedTimeLimitFive();
    }
}
