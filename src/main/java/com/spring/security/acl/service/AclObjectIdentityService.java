package com.spring.security.acl.service;

import com.spring.security.acl.domain.AclObjectIdentity;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AclObjectIdentity.
 */
public interface AclObjectIdentityService{

    /**
     * Save a aclObjectIdentity.
     *
     * @param aclObjectIdentity the entity to save
     * @return the persisted entity
     */
    AclObjectIdentity save(AclObjectIdentity aclObjectIdentity);

    /**
     * Get all the acl_Object_Identities.
     *
     * @return the list of entities
     */
    List<AclObjectIdentity> findAll();


    /**
     * Get the "id" acl_Object_Identity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AclObjectIdentity> findOne(Long id);

    /**
     * Delete the "id" aclObjectIdentity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
