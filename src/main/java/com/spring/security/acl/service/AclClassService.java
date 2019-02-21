package com.spring.security.acl.service;

import com.spring.security.acl.domain.AclClass;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AclClass.
 */
public interface AclClassService{

    /**
     * Save a acl_Class.
     *
     * @param acl_Class the entity to save
     * @return the persisted entity
     */
    AclClass save(AclClass aclClass);

    /**
     * Get all the acl_Classes.
     *
     * @return the list of entities
     */
    List<AclClass> findAll();


    /**
     * Get the "id" acl_Class.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AclClass> findOne(Long id);

    /**
     * Delete the "id" acl_Class.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
