package com.spring.security.acl.web.rest;
import com.spring.security.acl.domain.AclEntry;
import com.spring.security.acl.service.AclEntryService;
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
 * REST controller for managing AclEntry.
 */
@RestController
@RequestMapping("/api")
public class AclEntryResource {

    private final Logger log = LoggerFactory.getLogger(AclEntryResource.class);

    private static final String ENTITY_NAME = "aclEntry";

    private final AclEntryService aclEntryService;

    public AclEntryResource(AclEntryService aclEntryService) {
        this.aclEntryService = aclEntryService;
    }

    /**
     * POST  /acl-entries : Create a new aclEntry.
     *
     * @param aclEntry the aclEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aclEntry, or with status 400 (Bad Request) if the aclEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acl-entries")
    public ResponseEntity<AclEntry> createAclEntry(@RequestBody AclEntry aclEntry) throws URISyntaxException {
        log.debug("REST request to save AclEntry : {}", aclEntry);
        if (aclEntry.getId() != null) {
            throw new BadRequestAlertException("A new aclEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AclEntry result = aclEntryService.save(aclEntry);
        return ResponseEntity.created(new URI("/api/acl-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acl-entries : Updates an existing aclEntry.
     *
     * @param aclEntry the aclEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aclEntry,
     * or with status 400 (Bad Request) if the aclEntry is not valid,
     * or with status 500 (Internal Server Error) if the aclEntry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acl-entries")
    public ResponseEntity<AclEntry> updateAclEntry(@RequestBody AclEntry aclEntry) throws URISyntaxException {
        log.debug("REST request to update AclEntry : {}", aclEntry);
        if (aclEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AclEntry result = aclEntryService.save(aclEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aclEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acl-entries : get all the aclEntries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aclEntries in body
     */
    @GetMapping("/acl-entries")
    public List<AclEntry> getAllAclEntries() {
        log.debug("REST request to get all AclEntries");
        return aclEntryService.findAll();
    }

    /**
     * GET  /acl-entries/:id : get the "id" aclEntry.
     *
     * @param id the id of the aclEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aclEntry, or with status 404 (Not Found)
     */
    @GetMapping("/acl-entries/{id}")
    public ResponseEntity<AclEntry> getAclEntry(@PathVariable Long id) {
        log.debug("REST request to get AclEntry : {}", id);
        Optional<AclEntry> aclEntry = aclEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aclEntry);
    }

    /**
     * DELETE  /acl-entries/:id : delete the "id" aclEntry.
     *
     * @param id the id of the aclEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acl-entries/{id}")
    public ResponseEntity<Void> deleteAclEntry(@PathVariable Long id) {
        log.debug("REST request to delete AclEntry : {}", id);
        aclEntryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
