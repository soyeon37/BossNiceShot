package com.ssafy.domain.Member.entity;

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

    private static final long serialVersionUID = 1332972628L;

    public static final QMember member = new QMember("member1");

    public final NumberPath<Integer> averageScore = createNumber("averageScore", Integer.class);

    public final StringPath image = createString("image");

    public final StringPath introduction = createString("introduction");

    public final StringPath level = createString("level");

    public final StringPath memberId = createString("memberId");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final ListPath<Role, EnumPath<Role>> roles = this.<Role, EnumPath<Role>>createList("roles", Role.class, EnumPath.class, PathInits.DIRECT2);

    public final EnumPath<TeeBox> teeBox = createEnum("teeBox", TeeBox.class);

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

