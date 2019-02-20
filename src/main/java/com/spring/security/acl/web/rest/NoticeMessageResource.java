package com.spring.security.acl.web.rest;
import com.spring.security.acl.domain.NoticeMessage;
import com.spring.security.acl.service.NoticeMessageService;
import com.spring.security.acl.web.rest.errors.BadRequestAlertException;
import com.spring.security.acl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NoticeMessage.
 */
@RestController
@RequestMapping("/api")
public class NoticeMessageResource {

    private final Logger log = LoggerFactory.getLogger(NoticeMessageResource.class);

    private static final String ENTITY_NAME = "noticeMessage";

    private final NoticeMessageService noticeMessageService;

    public NoticeMessageResource(NoticeMessageService noticeMessageService) {
        this.noticeMessageService = noticeMessageService;
    }

    /**
     * POST  /notice-messages : Create a new noticeMessage.
     *
     * @param noticeMessage the noticeMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new noticeMessage, or with status 400 (Bad Request) if the noticeMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notice-messages")
    public ResponseEntity<NoticeMessage> createNoticeMessage(@RequestBody NoticeMessage noticeMessage) throws URISyntaxException {
        log.debug("REST request to save NoticeMessage : {}", noticeMessage);
        if (noticeMessage.getId() != null) {
            throw new BadRequestAlertException("A new noticeMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NoticeMessage result = noticeMessageService.save(noticeMessage);
        return ResponseEntity.created(new URI("/api/notice-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notice-messages : Updates an existing noticeMessage.
     *
     * @param noticeMessage the noticeMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated noticeMessage,
     * or with status 400 (Bad Request) if the noticeMessage is not valid,
     * or with status 500 (Internal Server Error) if the noticeMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notice-messages")
    public ResponseEntity<NoticeMessage> updateNoticeMessage(@RequestBody NoticeMessage noticeMessage) throws URISyntaxException {
        log.debug("REST request to update NoticeMessage : {}", noticeMessage);
        if (noticeMessage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NoticeMessage result = noticeMessageService.save(noticeMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, noticeMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notice-messages : get all the noticeMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of noticeMessages in body
     */
    @GetMapping("/notice-messages")
    public List<NoticeMessage> getAllNoticeMessages() {
        log.debug("REST request to get all NoticeMessages");
        return noticeMessageService.findAll();
    }

    /**
     * GET  /notice-messages/:id : get the "id" noticeMessage.
     *
     * @param id the id of the noticeMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the noticeMessage, or with status 404 (Not Found)
     */
    @GetMapping("/notice-messages/{id}")
    public ResponseEntity<NoticeMessage> getNoticeMessage(@PathVariable Long id) {
        log.debug("REST request to get NoticeMessage : {}", id);
        Optional<NoticeMessage> noticeMessage = noticeMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(noticeMessage);
    }

    /**
     * DELETE  /notice-messages/:id : delete the "id" noticeMessage.
     *
     * @param id the id of the noticeMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notice-messages/{id}")
    public ResponseEntity<Void> deleteNoticeMessage(@PathVariable Long id) {
        log.debug("REST request to delete NoticeMessage : {}", id);
        noticeMessageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
