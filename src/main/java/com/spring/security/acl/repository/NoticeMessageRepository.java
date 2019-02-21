package com.spring.security.acl.repository;

import com.spring.security.acl.domain.NoticeMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NoticeMessage entity.
 */
@Repository
public interface NoticeMessageRepository extends JpaRepository<NoticeMessage, Long>{

    @Override
    @PostFilter("hasPermission(filterObject, 'READ')")
    List<NoticeMessage> findAll();

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    NoticeMessage findById(Integer id);

    @Override
    @SuppressWarnings("unchecked")
    @PostFilter("hasPermission(filterObject, 'WRITE')")
    NoticeMessage save(@Param("noticeMessage") NoticeMessage noticeMessage);
}
