package com.spring.security.acl.repository;

import com.spring.security.acl.domain.NoticeMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NoticeMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoticeMessageRepository extends JpaRepository<NoticeMessage, Long> {

}
