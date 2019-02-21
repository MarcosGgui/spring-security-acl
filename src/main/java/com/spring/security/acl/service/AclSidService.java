package com.spring.security.acl.service;

import com.spring.security.acl.domain.AclSid;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AclSid.
 */
public interface AclSidService{

    /**
     * Save a aclSid.
     *
     * @param aclSid the entity to save
     * @return the persisted entity
     */
    AclSid save(AclSid aclSid);

    /**
     * Get all the aclSids.
     *
     * @return the list of entities
     */
    List<AclSid> findAll();


    /**
     * Get the "id" aclSid.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AclSid> findOne(Long id);

    /**
     * Delete the "id" aclSid.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
