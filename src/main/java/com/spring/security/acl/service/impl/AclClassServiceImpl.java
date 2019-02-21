package com.spring.security.acl.service.impl;

import com.spring.security.acl.service.AclClassService;
import com.spring.security.acl.domain.AclClass;
import com.spring.security.acl.repository.AclClassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AclClass.
 */
@Service
@Transactional
public class AclClassServiceImpl implements AclClassService{

    private final Logger log = LoggerFactory.getLogger(AclClassServiceImpl.class);

    private final AclClassRepository aclClassRepository;

    public AclClassServiceImpl(AclClassRepository aclClassRepository) {
        this.aclClassRepository = aclClassRepository;
    }

    /**
     * Save a aclClass.
     *
     * @param aclClass the entity to save
     * @return the persisted entity
     */
    @Override
    public AclClass save(AclClass aclClass) {
        log.debug("Request to save AclClass : {}", aclClass);
        return aclClassRepository.save(aclClass);
    }

    /**
     * Get all the acl_Classes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AclClass> findAll() {
        log.debug("Request to get all Acl_Classes");
        return aclClassRepository.findAll();
    }


    /**
     * Get one acl_Class by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AclClass> findOne(Long id) {
        log.debug("Request to get AclClass : {}", id);
        return aclClassRepository.findById(id);
    }

    /**
     * Delete the acl_Class by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AclClass : {}", id);        aclClassRepository.deleteById(id);
    }
}
