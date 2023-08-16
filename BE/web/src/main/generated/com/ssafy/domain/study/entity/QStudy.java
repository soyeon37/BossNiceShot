package com.ssafy.domain.study.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudy is a Querydsl query type for Study
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudy extends EntityPathBase<Study> {

    private static final long serialVersionUID = -1082309114L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudy study = new QStudy("study");

    public final com.ssafy.audit.QBaseTime _super = new com.ssafy.audit.QBaseTime(this);

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath locked = createBoolean("locked");

    public final com.ssafy.domain.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final NumberPath<Integer> password = createNumber("password", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> reservedTime = createDateTime("reservedTime", java.time.LocalDateTime.class);

    public final EnumPath<com.ssafy.common.Status> status = createEnum("status", com.ssafy.common.Status.class);

    public final NumberPath<Integer> studyUserCount = createNumber("studyUserCount", Integer.class);

    public final StringPath title = createString("title");

    public final EnumPath<StudyType> type = createEnum("type", StudyType.class);

    public QStudy(String variable) {
        this(Study.class, forVariable(variable), INITS);
    }

    public QStudy(Path<? extends Study> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudy(PathMetadata metadata, PathInits inits) {
        this(Study.class, metadata, inits);
    }

    public QStudy(Class<? extends Study> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

