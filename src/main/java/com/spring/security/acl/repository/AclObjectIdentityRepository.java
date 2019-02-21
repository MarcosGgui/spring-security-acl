package com.spring.security.acl.repository;

import com.spring.security.acl.domain.AclObjectIdentity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AclObjectIdentity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AclObjectIdentityRepository extends JpaRepository<AclObjectIdentity, Long> {

}
