package com.ssafy.domain.Companion.service;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionService {




}

//
//@Service
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
//public class StudyService {
//    private final StudyRepository studyRepository;
//    private final MemberService memberService;
//
//    // 스터디 생성 기능
//    @Transactional
//    public Study create(StudyCreateRequest studyCreateRequest, String memberId) {
//        // studyCreateRequest를 Study 엔티티로 변환하고, memberId로 멤버를 찾아 스터디 생성 및 저장 후 반환
//        return studyRepository.save(studyCreateRequest.toStudy(memberService.findByMemberId(memberId)));
//    }
//
//    // 스터디 정보 수정 기능
//    @Transactional
//    public Study update(StudyUpdateRequest studyUpdateRequest, Long studyId) {
//        studyRepository.findById(studyId)
//                .ifPresentOrElse(study -> study.update(
//                                studyUpdateRequest.title(),
//                                studyUpdateRequest.description(),
//                                LocalDateTime.parse(studyUpdateRequest.reservedTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
//                                studyUpdateRequest.capacity(),
//                                studyUpdateRequest.locked(),
//                                studyUpdateRequest.password()),
//                        () -> { throw new EntityNotFoundException(); });
//
//        return findById(studyId);
//    }
//
//    // 스터디 삭제 기능
//    @Transactional
//    public void deleteById(Long studyId) {
//        studyRepository.deleteById(studyId);
//    }
//
//    // 스터디 활성화 기능
//    @Transactional
//    public Study active(Long studyId) {
//        studyRepository.findById(studyId)
//                .ifPresentOrElse(Study::active,
//                        () -> { throw new EntityNotFoundException(); });
//
//        return findById(studyId);
//    }
//
//    // 스터디 ID로 스터디 정보 조회 기능
//    public Study findById(Long studyId) {
//        return studyRepository.findById(studyId).orElseThrow(EntityNotFoundException::new);
//    }
//
//    // 스터디 타입별로 페이징 조회 기능
//    public Page<Study> findPaging(Pageable pageable, String type) {
//        return studyRepository.findPagingByType(pageable, StudyType.valueOf(type));
//    }
//
//    // 특정 키워드로 스터디 검색 기능
//    public Page<Study> findByKeyword(Pageable pageable, String type, StudySearchRequest studySearchRequest) {
//        if (studySearchRequest.category().equals("title")) {
//            return studyRepository.findPagingByTypeAndTitleContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//        if (studySearchRequest.category().equals("nickname")) {
//            return studyRepository.findPagingByTypeAndMemberNickNameContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//        if (studySearchRequest.category().equals("titleAndDescription")) {
//            return studyRepository.findPagingByTypeAndTitleContainingOrDescriptionContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//
//        // 카테고리가 잘못되어 들어온 경우 에러를 발생시킴
//        throw new EntityNotFoundException();
//    }
//
//    // 특정 스터디 타입에 참가 가능한 스터디를 페이징 조회하는 기능
//    public Page<Study> findPagingAttandableCoaching(Pageable pageable, String type) {
//        return studyRepository.findPagingAttandableByType(pageable, StudyType.valueOf(type));
//    }
//
//    // 특정 스터디 타입에 참가 가능한 스터디 중 특정 키워드로 검색하는 기능
//    public Page<Study> findAttandableCoachingByKeyword(Pageable pageable, String type, StudySearchRequest studySearchRequest) {
//        if (studySearchRequest.category().equals("title")) {
//            return studyRepository.findPagingAttandableByTypeAndTitleContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//        if (studySearchRequest.category().equals("nickname")) {
//            return studyRepository.findPagingAttandableByTypeAndMemberNickNameContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//        if (studySearchRequest.category().equals("titleAndDescription")) {
//            return studyRepository.findPagingAttandableByTypeAndTitleContainingOrDescriptionContaining(pageable, StudyType.valueOf(type), studySearchRequest.keyword());
//        }
//
//        // 카테고리가 잘못되어 들어온 경우 에러를 발생시킴
//        throw new EntityNotFoundException();
//    }
//}
