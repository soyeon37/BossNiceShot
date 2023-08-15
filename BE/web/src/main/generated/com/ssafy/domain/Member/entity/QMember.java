package com.ssafy.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1135499316L;

    public static final QMember member = new QMember("member1");

    public final com.ssafy.audit.QBaseTime _super = new com.ssafy.audit.QBaseTime(this);

    public final NumberPath<Integer> averageScore = createNumber("averageScore", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath id = createString("id");

    public final StringPath image = createString("image");

    public final StringPath introduction = createString("introduction");

    public final BooleanPath isKakao = createBoolean("isKakao");

    public final StringPath level = createString("level");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final ListPath<Role, EnumPath<Role>> roles = this.<Role, EnumPath<Role>>createList("roles", Role.class, EnumPath.class, PathInits.DIRECT2);

    public final EnumPath<com.ssafy.common.TeeBox> teeBox = createEnum("teeBox", com.ssafy.common.TeeBox.class);

    public final NumberPath<Integer> topScore = createNumber("topScore", Integer.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

