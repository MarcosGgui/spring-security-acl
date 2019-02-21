package com.spring.security.acl.service.impl;

import com.spring.security.acl.service.AclEntryService;
import com.spring.security.acl.domain.AclEntry;
import com.spring.security.acl.repository.AclEntryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AclEntry.
 */
@Service
@Transactional
public class AclEntryServiceImpl implements AclEntryService {

    private final Logger log = LoggerFactory.getLogger(AclEntryServiceImpl.class);

    private final AclEntryRepository aclEntryRepository;

    public AclEntryServiceImpl(AclEntryRepository aclEntryRepository) {
        this.aclEntryRepository = aclEntryRepository;
    }

    /**
     * Save a aclEntry.
     *
     * @param aclEntry the entity to save
     * @return the persisted entity
     */
    @Override
    public AclEntry save(AclEntry aclEntry) {
        log.debug("Request to save AclEntry : {}", aclEntry);
        return aclEntryRepository.save(aclEntry);
    }

    /**
     * Get all the aclEntries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AclEntry> findAll() {
        log.debug("Request to get all AclEntries");
        return aclEntryRepository.findAll();
    }


    /**
     * Get one aclEntry by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AclEntry> findOne(Long id) {
        log.debug("Request to get AclEntry : {}", id);
        return aclEntryRepository.findById(id);
    }

    /**
     * Delete the aclEntry by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AclEntry : {}", id);        aclEntryRepository.deleteById(id);
    }
}
