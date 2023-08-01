package com.ssafy.domain.study.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.study.dto.request.LearningCreateRequest;
import com.ssafy.domain.study.dto.request.LearningUpdateRequest;
import com.ssafy.domain.study.entity.Learning;
import com.ssafy.domain.study.repository.LearningRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LearningService {
    private final LearningRepository learningRepository;
    private final MemberService memberService;

    @Transactional
    public Learning create(LearningCreateRequest learningCreateRequest, String memberId) {
        return learningRepository.save(learningCreateRequest.toLearning(memberService.findByMemberId(memberId)));
    }

    @Transactional
    public Learning update(LearningUpdateRequest learningUpdateRequest, Long studyId) {
        learningRepository.findById(studyId)
                .ifPresentOrElse(learning -> learning.update(learningUpdateRequest.title(), learningUpdateRequest.description(), learningUpdateRequest.password()),
                        () -> { throw new EntityNotFoundException(); });

        return findById(studyId);
    }

    @Transactional
    public void deleteById(Long studyId) {
        learningRepository.deleteById(studyId);
    }

    public Learning findById(Long studyId) {
        return learningRepository.findById(studyId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Learning> findAllByCreatedTimeDesc() {
        return learningRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTime"));
    }
}
