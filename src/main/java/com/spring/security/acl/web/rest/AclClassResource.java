package com.spring.security.acl.web.rest;
import com.spring.security.acl.domain.AclClass;
import com.spring.security.acl.service.AclClassService;
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
 * REST controller for managing AclClass.
 */
@RestController
@RequestMapping("/api")
public class AclClassResource{

    private final Logger log = LoggerFactory.getLogger(AclClassResource.class);

    private static final String ENTITY_NAME = "acl_Class";

    private final AclClassService aclClassService;

    public AclClassResource(AclClassService aclClassService) {
        this.aclClassService = aclClassService;
    }

    /**
     * POST  /acl-classes : Create a new aclClass.
     *
     * @param aclClass the aclClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aclClass, or with status 400 (Bad Request) if the aclClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acl-classes")
    public ResponseEntity<AclClass> createAclClass(@RequestBody AclClass aclClass) throws URISyntaxException {
        log.debug("REST request to save AclClass : {}", aclClass);
        if (aclClass.getId() != null) {
            throw new BadRequestAlertException("A new aclClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AclClass result = aclClassService.save(aclClass);
        return ResponseEntity.created(new URI("/api/acl-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acl-classes : Updates an existing aclClass.
     *
     * @param aclClass the aclClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aclClass,
     * or with status 400 (Bad Request) if the aclClass is not valid,
     * or with status 500 (Internal Server Error) if the aclClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acl-classes")
    public ResponseEntity<AclClass> updateAcl_Class(@RequestBody AclClass aclClass) throws URISyntaxException {
        log.debug("REST request to update AclClass : {}", aclClass);
        if (aclClass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AclClass result = aclClassService.save(aclClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aclClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acl-classes : get all the acl_Classes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acl_Classes in body
     */
    @GetMapping("/acl-classes")
    public List<AclClass> getAllAclClasses() {
        log.debug("REST request to get all AclClasses");
        return aclClassService.findAll();
    }

    /**
     * GET  /acl-classes/:id : get the "id" acl_Class.
     *
     * @param id the id of the acl_Class to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acl_Class, or with status 404 (Not Found)
     */
    @GetMapping("/acl-classes/{id}")
    public ResponseEntity<AclClass> getAclClass(@PathVariable Long id) {
        log.debug("REST request to get AclClass : {}", id);
        Optional<AclClass> aclClass = aclClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aclClass);
    }

    /**
     * DELETE  /acl-classes/:id : delete the "id" acl_Class.
     *
     * @param id the id of the acl_Class to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acl-classes/{id}")
    public ResponseEntity<Void> deleteAclClass(@PathVariable Long id) {
        log.debug("REST request to delete AclClass : {}", id);
        aclClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
