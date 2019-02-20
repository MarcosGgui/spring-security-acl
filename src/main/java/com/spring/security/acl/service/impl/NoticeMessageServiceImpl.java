package com.spring.security.acl.service.impl;

import com.spring.security.acl.service.NoticeMessageService;
import com.spring.security.acl.domain.NoticeMessage;
import com.spring.security.acl.repository.NoticeMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing NoticeMessage.
 */
@Service
@Transactional
public class NoticeMessageServiceImpl implements NoticeMessageService {

    private final Logger log = LoggerFactory.getLogger(NoticeMessageServiceImpl.class);

    private final NoticeMessageRepository noticeMessageRepository;

    public NoticeMessageServiceImpl(NoticeMessageRepository noticeMessageRepository) {
        this.noticeMessageRepository = noticeMessageRepository;
    }

    /**
     * Save a noticeMessage.
     *
     * @param noticeMessage the entity to save
     * @return the persisted entity
     */
    @Override
    public NoticeMessage save(NoticeMessage noticeMessage) {
        log.debug("Request to save NoticeMessage : {}", noticeMessage);
        return noticeMessageRepository.save(noticeMessage);
    }

    /**
     * Get all the noticeMessages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NoticeMessage> findAll() {
        log.debug("Request to get all NoticeMessages");
        return noticeMessageRepository.findAll();
    }


    /**
     * Get one noticeMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NoticeMessage> findOne(Long id) {
        log.debug("Request to get NoticeMessage : {}", id);
        return noticeMessageRepository.findById(id);
    }

    /**
     * Delete the noticeMessage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NoticeMessage : {}", id);        noticeMessageRepository.deleteById(id);
    }
}
