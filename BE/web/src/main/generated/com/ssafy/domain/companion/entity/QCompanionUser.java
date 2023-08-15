package com.ssafy.domain.companion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanionUser is a Querydsl query type for CompanionUser
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanionUser extends EntityPathBase<CompanionUser> {

    private static final long serialVersionUID = -851418799L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanionUser companionUser = new QCompanionUser("companionUser");

    public final QCompanion companion;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.domain.member.entity.QMember member;

    public final EnumPath<com.ssafy.common.Status> status = createEnum("status", com.ssafy.common.Status.class);

    public QCompanionUser(String variable) {
        this(CompanionUser.class, forVariable(variable), INITS);
    }

    public QCompanionUser(Path<? extends CompanionUser> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanionUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanionUser(PathMetadata metadata, PathInits inits) {
        this(CompanionUser.class, metadata, inits);
    }

    public QCompanionUser(Class<? extends CompanionUser> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.companion = inits.isInitialized("companion") ? new QCompanion(forProperty("companion"), inits.get("companion")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

