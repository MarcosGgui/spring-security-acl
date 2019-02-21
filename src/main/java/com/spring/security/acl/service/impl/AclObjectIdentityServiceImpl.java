package com.spring.security.acl.service.impl;

import com.spring.security.acl.domain.AclObjectIdentity;
import com.spring.security.acl.service.AclObjectIdentityService;
import com.spring.security.acl.repository.AclObjectIdentityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AclObjectIdentity.
 */
@Service
@Transactional
public class AclObjectIdentityServiceImpl implements AclObjectIdentityService{

    private final Logger log = LoggerFactory.getLogger(AclObjectIdentityServiceImpl.class);

    private final AclObjectIdentityRepository aclObjectIdentityRepository;

    public AclObjectIdentityServiceImpl(AclObjectIdentityRepository aclObjectIdentityRepository) {
        this.aclObjectIdentityRepository = aclObjectIdentityRepository;
    }

    /**
     * Save a aclObjectIdentity.
     *
     * @param aclObjectIdentity the entity to save
     * @return the persisted entity
     */
    @Override
    public AclObjectIdentity save(AclObjectIdentity aclObjectIdentity) {
        log.debug("Request to save AclObjectIdentity : {}", aclObjectIdentity);
        return aclObjectIdentityRepository.save(aclObjectIdentity);
    }

    /**
     * Get all the acl_Object_Identities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AclObjectIdentity> findAll() {
        log.debug("Request to get all AclObjectIdentities");
        return aclObjectIdentityRepository.findAll();
    }


    /**
     * Get one acl_Object_Identity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AclObjectIdentity> findOne(Long id) {
        log.debug("Request to get AclObjectIdentity : {}", id);
        return aclObjectIdentityRepository.findById(id);
    }

    /**
     * Delete the acl_Object_Identity by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AclObjectIdentity : {}", id);        aclObjectIdentityRepository.deleteById(id);
    }
}
