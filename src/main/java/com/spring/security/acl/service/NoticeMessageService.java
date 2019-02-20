package com.spring.security.acl.service;

import com.spring.security.acl.domain.NoticeMessage;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NoticeMessage.
 */
public interface NoticeMessageService {

    /**
     * Save a noticeMessage.
     *
     * @param noticeMessage the entity to save
     * @return the persisted entity
     */
    NoticeMessage save(NoticeMessage noticeMessage);

    /**
     * Get all the noticeMessages.
     *
     * @return the list of entities
     */
    List<NoticeMessage> findAll();


    /**
     * Get the "id" noticeMessage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NoticeMessage> findOne(Long id);

    /**
     * Delete the "id" noticeMessage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
