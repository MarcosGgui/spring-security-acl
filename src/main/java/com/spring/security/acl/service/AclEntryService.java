package com.spring.security.acl.service;

import com.spring.security.acl.domain.AclEntry;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AclEntry.
 */
public interface AclEntryService {

    /**
     * Save a aclEntry.
     *
     * @param aclEntry the entity to save
     * @return the persisted entity
     */
    AclEntry save(AclEntry aclEntry);

    /**
     * Get all the aclEntries.
     *
     * @return the list of entities
     */
    List<AclEntry> findAll();


    /**
     * Get the "id" aclEntry.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AclEntry> findOne(Long id);

    /**
     * Delete the "id" aclEntry.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
