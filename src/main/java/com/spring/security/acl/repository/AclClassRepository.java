package com.spring.security.acl.repository;

import com.spring.security.acl.domain.AclClass;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AclClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AclClassRepository extends JpaRepository<AclClass, Long> {

}
