package com.spring.security.acl.service.impl;

import com.spring.security.acl.domain.AclSid;
import com.spring.security.acl.service.AclSidService;
import com.spring.security.acl.repository.AclSidRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AclSid.
 */
@Service
@Transactional
public class AclSidServiceImpl implements AclSidService{

    private final Logger log = LoggerFactory.getLogger(AclSidServiceImpl.class);

    private final AclSidRepository aclSidRepository;

    public AclSidServiceImpl(AclSidRepository aclSidRepository) {
        this.aclSidRepository = aclSidRepository;
    }

    /**
     * Save a aclSid.
     *
     * @param aclSid the entity to save
     * @return the persisted entity
     */
    @Override
    public AclSid save(AclSid aclSid) {
        log.debug("Request to save AclSid : {}", aclSid);
        return aclSidRepository.save(aclSid);
    }

    /**
     * Get all the acl_Sids.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AclSid> findAll() {
        log.debug("Request to get all AclSids");
        return aclSidRepository.findAll();
    }


    /**
     * Get one acl_Sid by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AclSid> findOne(Long id) {
        log.debug("Request to get AclSid : {}", id);
        return aclSidRepository.findById(id);
    }

    /**
     * Delete the acl_Sid by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AclSid : {}", id);        aclSidRepository.deleteById(id);
    }
}
