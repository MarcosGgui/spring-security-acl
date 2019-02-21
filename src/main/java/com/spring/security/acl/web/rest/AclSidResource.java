package com.spring.security.acl.web.rest;
import com.spring.security.acl.domain.AclSid;
import com.spring.security.acl.service.AclSidService;
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
 * REST controller for managing AclSid.
 */
@RestController
@RequestMapping("/api")
public class AclSidResource{

    private final Logger log = LoggerFactory.getLogger(AclSidResource.class);

    private static final String ENTITY_NAME = "acl_Sid";

    private final AclSidService aclSidService;

    public AclSidResource(AclSidService aclSidService) {
        this.aclSidService = aclSidService;
    }

    /**
     * POST  /acl-sids : Create a new aclSid.
     *
     * @param aclSid the aclSid to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aclSid, or with status 400 (Bad Request) if the aclSid has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acl-sids")
    public ResponseEntity<AclSid> createAclSid(@RequestBody AclSid aclSid) throws URISyntaxException {
        log.debug("REST request to save AclSid : {}", aclSid);
        if (aclSid.getId() != null) {
            throw new BadRequestAlertException("A new aclSid cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AclSid result = aclSidService.save(aclSid);
        return ResponseEntity.created(new URI("/api/acl-sids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acl-sids : Updates an existing aclSid.
     *
     * @param aclSid the aclSid to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aclSid,
     * or with status 400 (Bad Request) if the aclSid is not valid,
     * or with status 500 (Internal Server Error) if the aclSid couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acl-sids")
    public ResponseEntity<AclSid> updateAclSid(@RequestBody AclSid aclSid) throws URISyntaxException {
        log.debug("REST request to update AclSid : {}", aclSid);
        if (aclSid.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AclSid result = aclSidService.save(aclSid);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aclSid.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acl-sids : get all the acl_Sids.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acl_Sids in body
     */
    @GetMapping("/acl-sids")
    public List<AclSid> getAllAclSids() {
        log.debug("REST request to get all Acl_Sids");
        return aclSidService.findAll();
    }

    /**
     * GET  /acl-sids/:id : get the "id" acl_Sid.
     *
     * @param id the id of the acl_Sid to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acl_Sid, or with status 404 (Not Found)
     */
    @GetMapping("/acl-sids/{id}")
    public ResponseEntity<AclSid> getAclSid(@PathVariable Long id) {
        log.debug("REST request to get AclSid : {}", id);
        Optional<AclSid> aclSid = aclSidService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aclSid);
    }

    /**
     * DELETE  /acl-sids/:id : delete the "id" acl_Sid.
     *
     * @param id the id of the acl_Sid to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acl-sids/{id}")
    public ResponseEntity<Void> deleteAclSid(@PathVariable Long id) {
        log.debug("REST request to delete AclSid : {}", id);
        aclSidService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
