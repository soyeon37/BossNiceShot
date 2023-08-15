package com.ssafy.domain.study.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyUser is a Querydsl query type for StudyUser
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyUser extends EntityPathBase<StudyUser> {

    private static final long serialVersionUID = -1813564687L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyUser studyUser = new QStudyUser("studyUser");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.domain.member.entity.QMember member;

    public final QStudy study;

    public QStudyUser(String variable) {
        this(StudyUser.class, forVariable(variable), INITS);
    }

    public QStudyUser(Path<? extends StudyUser> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyUser(PathMetadata metadata, PathInits inits) {
        this(StudyUser.class, metadata, inits);
    }

    public QStudyUser(Class<? extends StudyUser> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.domain.member.entity.QMember(forProperty("member")) : null;
        this.study = inits.isInitialized("study") ? new QStudy(forProperty("study"), inits.get("study")) : null;
    }

}

