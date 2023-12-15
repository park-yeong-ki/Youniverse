package com.ssafy.youniverse.util;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.PathBuilder;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class PageSort {
    //pageable 동적 정렬
    protected OrderSpecifier[] getOrderSpecifier(Sort sort, Class type, PathMetadata pathMetadata) {
        List<OrderSpecifier> orders = new ArrayList<>();

        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            PathBuilder orderByExpression = new PathBuilder<>(type, pathMetadata);
            orders.add(new OrderSpecifier<>(direction, orderByExpression.get(prop)));
        });

        return orders.stream().toArray(OrderSpecifier[]::new);
    }
}
