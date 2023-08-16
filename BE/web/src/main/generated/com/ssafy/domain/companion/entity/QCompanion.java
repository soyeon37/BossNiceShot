package com.ssafy.domain.companion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanion is a Querydsl query type for Companion
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanion extends EntityPathBase<Companion> {

    private static final long serialVersionUID = -697523098L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanion companion = new QCompanion("companion");

    public final com.ssafy.audit.QBaseTime _super = new com.ssafy.audit.QBaseTime(this);

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    public final NumberPath<Integer> companionUserCount = createNumber("companionUserCount", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath description = createString("description");

    public final NumberPath<Integer> field = createNumber("field", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.domain.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final EnumPath<com.ssafy.common.TeeBox> teeBox = createEnum("teeBox", com.ssafy.common.TeeBox.class);

    public final DateTimePath<java.time.LocalDateTime> teeUpTime = createDateTime("teeUpTime", java.time.LocalDateTime.class);

    public final StringPath title = createString("title");

    public QCompanion(String variable) {
        this(Companion.class, forVariable(variable), INITS);
    }

    public QCompanion(Path<? extends Companion> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanion(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanion(PathMetadata metadata, PathInits inits) {
        this(Companion.class, metadata, inits);
    }

    public QCompanion(Class<? extends Companion> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

