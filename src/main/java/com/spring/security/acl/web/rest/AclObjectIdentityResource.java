package com.spring.security.acl.web.rest;
import com.spring.security.acl.domain.AclObjectIdentity;
import com.spring.security.acl.service.AclObjectIdentityService;
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
 * REST controller for managing AclObjectIdentity.
 */
@RestController
@RequestMapping("/api")
public class AclObjectIdentityResource{

    private final Logger log = LoggerFactory.getLogger(AclObjectIdentityResource.class);

    private static final String ENTITY_NAME = "acl_Object_Identity";

    private final AclObjectIdentityService aclObjectIdentityService;

    public AclObjectIdentityResource(AclObjectIdentityService aclObjectIdentityService) {
        this.aclObjectIdentityService = aclObjectIdentityService;
    }

    /**
     * POST  /acl-object-identities : Create a new aclObjectIdentity.
     *
     * @param aclObjectIdentity the aclObjectIdentity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aclObjectIdentity, or with status 400 (Bad Request) if the aclObjectIdentity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acl-object-identities")
    public ResponseEntity<AclObjectIdentity> createAclObjectIdentity(@RequestBody AclObjectIdentity aclObjectIdentity) throws URISyntaxException {
        log.debug("REST request to save AclObjectIdentity : {}", aclObjectIdentity);
        if (aclObjectIdentity.getId() != null) {
            throw new BadRequestAlertException("A new aclObjectIdentity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AclObjectIdentity result = aclObjectIdentityService.save(aclObjectIdentity);
        return ResponseEntity.created(new URI("/api/acl-object-identities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acl-object-identities : Updates an existing acl_Object_Identity.
     *
     * @param acl_Object_Identity the acl_Object_Identity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acl_Object_Identity,
     * or with status 400 (Bad Request) if the acl_Object_Identity is not valid,
     * or with status 500 (Internal Server Error) if the acl_Object_Identity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acl-object-identities")
    public ResponseEntity<AclObjectIdentity> updateAclObjectIdentity(@RequestBody AclObjectIdentity acl_Object_Identity) throws URISyntaxException {
        log.debug("REST request to update AclObjectIdentity : {}", acl_Object_Identity);
        if (acl_Object_Identity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AclObjectIdentity result = aclObjectIdentityService.save(acl_Object_Identity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acl_Object_Identity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acl-object-identities : get all the acl_Object_Identities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acl_Object_Identities in body
     */
    @GetMapping("/acl-object-identities")
    public List<AclObjectIdentity> getAllAclObjectIdentities() {
        log.debug("REST request to get all Acl_Object_Identities");
        return aclObjectIdentityService.findAll();
    }

    /**
     * GET  /acl-object-identities/:id : get the "id" acl_Object_Identity.
     *
     * @param id the id of the acl_Object_Identity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acl_Object_Identity, or with status 404 (Not Found)
     */
    @GetMapping("/acl-object-identities/{id}")
    public ResponseEntity<AclObjectIdentity> getAclObjectIdentity(@PathVariable Long id) {
        log.debug("REST request to get AclObjectIdentity : {}", id);
        Optional<AclObjectIdentity> aclObjectIdentity = aclObjectIdentityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aclObjectIdentity);
    }

    /**
     * DELETE  /acl-object-identities/:id : delete the "id" acl_Object_Identity.
     *
     * @param id the id of the acl_Object_Identity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acl-object-identities/{id}")
    public ResponseEntity<Void> deleteAclObjectIdentity(@PathVariable Long id) {
        log.debug("REST request to delete AclObjectIdentity : {}", id);
        aclObjectIdentityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
