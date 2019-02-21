package com.spring.security.acl.web.rest;

import com.spring.security.acl.SpringSecurityAclApp;

import com.spring.security.acl.domain.AclObjectIdentity;
import com.spring.security.acl.repository.AclObjectIdentityRepository;
import com.spring.security.acl.service.AclObjectIdentityService;
import com.spring.security.acl.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.spring.security.acl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Acl_Object_IdentityResource REST controller.
 *
 * @see AclObjectIdentityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringSecurityAclApp.class)
public class Acl_Object_IdentityResourceIntTest {

    private static final Integer DEFAULT_OBJECT_ID_CLASS = 1;
    private static final Integer UPDATED_OBJECT_ID_CLASS = 2;

    private static final String DEFAULT_OBJECT_ID_IDENTITY = "AAAAAAAAAA";
    private static final String UPDATED_OBJECT_ID_IDENTITY = "BBBBBBBBBB";

    private static final Integer DEFAULT_PARENT_OBJECT = 1;
    private static final Integer UPDATED_PARENT_OBJECT = 2;

    private static final Integer DEFAULT_OWNER_SID = 1;
    private static final Integer UPDATED_OWNER_SID = 2;

    private static final Integer DEFAULT_ENTRIES_INHERITING = 1;
    private static final Integer UPDATED_ENTRIES_INHERITING = 2;

    @Autowired
    private AclObjectIdentityRepository acl_Object_IdentityRepository;

    @Autowired
    private AclObjectIdentityService acl_Object_IdentityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAcl_Object_IdentityMockMvc;

    private AclObjectIdentity acl_Object_Identity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AclObjectIdentityResource acl_Object_IdentityResource = new AclObjectIdentityResource(acl_Object_IdentityService);
        this.restAcl_Object_IdentityMockMvc = MockMvcBuilders.standaloneSetup(acl_Object_IdentityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AclObjectIdentity createEntity(EntityManager em) {
        AclObjectIdentity acl_Object_Identity = new AclObjectIdentity()
            .objectIdClass(DEFAULT_OBJECT_ID_CLASS)
            .objectIdIdentity(DEFAULT_OBJECT_ID_IDENTITY)
            .parentObject(DEFAULT_PARENT_OBJECT)
            .ownerSid(DEFAULT_OWNER_SID)
            .entriesInheriting(DEFAULT_ENTRIES_INHERITING);
        return acl_Object_Identity;
    }

    @Before
    public void initTest() {
        acl_Object_Identity = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcl_Object_Identity() throws Exception {
        int databaseSizeBeforeCreate = acl_Object_IdentityRepository.findAll().size();

        // Create the AclObjectIdentity
        restAcl_Object_IdentityMockMvc.perform(post("/api/acl-object-identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Object_Identity)))
            .andExpect(status().isCreated());

        // Validate the AclObjectIdentity in the database
        List<AclObjectIdentity> acl_Object_IdentityList = acl_Object_IdentityRepository.findAll();
        assertThat(acl_Object_IdentityList).hasSize(databaseSizeBeforeCreate + 1);
        AclObjectIdentity testAcl_Object_Identity = acl_Object_IdentityList.get(acl_Object_IdentityList.size() - 1);
        assertThat(testAcl_Object_Identity.getObjectIdClass()).isEqualTo(DEFAULT_OBJECT_ID_CLASS);
        assertThat(testAcl_Object_Identity.getObjectIdIdentity()).isEqualTo(DEFAULT_OBJECT_ID_IDENTITY);
        assertThat(testAcl_Object_Identity.getParentObject()).isEqualTo(DEFAULT_PARENT_OBJECT);
        assertThat(testAcl_Object_Identity.getOwnerSid()).isEqualTo(DEFAULT_OWNER_SID);
        assertThat(testAcl_Object_Identity.getEntriesInheriting()).isEqualTo(DEFAULT_ENTRIES_INHERITING);
    }

    @Test
    @Transactional
    public void createAcl_Object_IdentityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acl_Object_IdentityRepository.findAll().size();

        // Create the AclObjectIdentity with an existing ID
        acl_Object_Identity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcl_Object_IdentityMockMvc.perform(post("/api/acl-object-identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Object_Identity)))
            .andExpect(status().isBadRequest());

        // Validate the AclObjectIdentity in the database
        List<AclObjectIdentity> acl_Object_IdentityList = acl_Object_IdentityRepository.findAll();
        assertThat(acl_Object_IdentityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcl_Object_Identities() throws Exception {
        // Initialize the database
        acl_Object_IdentityRepository.saveAndFlush(acl_Object_Identity);

        // Get all the acl_Object_IdentityList
        restAcl_Object_IdentityMockMvc.perform(get("/api/acl-object-identities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acl_Object_Identity.getId().intValue())))
            .andExpect(jsonPath("$.[*].objectIdClass").value(hasItem(DEFAULT_OBJECT_ID_CLASS)))
            .andExpect(jsonPath("$.[*].objectIdIdentity").value(hasItem(DEFAULT_OBJECT_ID_IDENTITY.toString())))
            .andExpect(jsonPath("$.[*].parentObject").value(hasItem(DEFAULT_PARENT_OBJECT)))
            .andExpect(jsonPath("$.[*].ownerSid").value(hasItem(DEFAULT_OWNER_SID)))
            .andExpect(jsonPath("$.[*].entriesInheriting").value(hasItem(DEFAULT_ENTRIES_INHERITING)));
    }
    
    @Test
    @Transactional
    public void getAcl_Object_Identity() throws Exception {
        // Initialize the database
        acl_Object_IdentityRepository.saveAndFlush(acl_Object_Identity);

        // Get the acl_Object_Identity
        restAcl_Object_IdentityMockMvc.perform(get("/api/acl-object-identities/{id}", acl_Object_Identity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acl_Object_Identity.getId().intValue()))
            .andExpect(jsonPath("$.objectIdClass").value(DEFAULT_OBJECT_ID_CLASS))
            .andExpect(jsonPath("$.objectIdIdentity").value(DEFAULT_OBJECT_ID_IDENTITY.toString()))
            .andExpect(jsonPath("$.parentObject").value(DEFAULT_PARENT_OBJECT))
            .andExpect(jsonPath("$.ownerSid").value(DEFAULT_OWNER_SID))
            .andExpect(jsonPath("$.entriesInheriting").value(DEFAULT_ENTRIES_INHERITING));
    }

    @Test
    @Transactional
    public void getNonExistingAcl_Object_Identity() throws Exception {
        // Get the acl_Object_Identity
        restAcl_Object_IdentityMockMvc.perform(get("/api/acl-object-identities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcl_Object_Identity() throws Exception {
        // Initialize the database
        acl_Object_IdentityService.save(acl_Object_Identity);

        int databaseSizeBeforeUpdate = acl_Object_IdentityRepository.findAll().size();

        // Update the acl_Object_Identity
        AclObjectIdentity updatedAcl_Object_Identity = acl_Object_IdentityRepository.findById(acl_Object_Identity.getId()).get();
        // Disconnect from session so that the updates on updatedAcl_Object_Identity are not directly saved in db
        em.detach(updatedAcl_Object_Identity);
        updatedAcl_Object_Identity
            .objectIdClass(UPDATED_OBJECT_ID_CLASS)
            .objectIdIdentity(UPDATED_OBJECT_ID_IDENTITY)
            .parentObject(UPDATED_PARENT_OBJECT)
            .ownerSid(UPDATED_OWNER_SID)
            .entriesInheriting(UPDATED_ENTRIES_INHERITING);

        restAcl_Object_IdentityMockMvc.perform(put("/api/acl-object-identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcl_Object_Identity)))
            .andExpect(status().isOk());

        // Validate the AclObjectIdentity in the database
        List<AclObjectIdentity> acl_Object_IdentityList = acl_Object_IdentityRepository.findAll();
        assertThat(acl_Object_IdentityList).hasSize(databaseSizeBeforeUpdate);
        AclObjectIdentity testAcl_Object_Identity = acl_Object_IdentityList.get(acl_Object_IdentityList.size() - 1);
        assertThat(testAcl_Object_Identity.getObjectIdClass()).isEqualTo(UPDATED_OBJECT_ID_CLASS);
        assertThat(testAcl_Object_Identity.getObjectIdIdentity()).isEqualTo(UPDATED_OBJECT_ID_IDENTITY);
        assertThat(testAcl_Object_Identity.getParentObject()).isEqualTo(UPDATED_PARENT_OBJECT);
        assertThat(testAcl_Object_Identity.getOwnerSid()).isEqualTo(UPDATED_OWNER_SID);
        assertThat(testAcl_Object_Identity.getEntriesInheriting()).isEqualTo(UPDATED_ENTRIES_INHERITING);
    }

    @Test
    @Transactional
    public void updateNonExistingAcl_Object_Identity() throws Exception {
        int databaseSizeBeforeUpdate = acl_Object_IdentityRepository.findAll().size();

        // Create the AclObjectIdentity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcl_Object_IdentityMockMvc.perform(put("/api/acl-object-identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Object_Identity)))
            .andExpect(status().isBadRequest());

        // Validate the AclObjectIdentity in the database
        List<AclObjectIdentity> acl_Object_IdentityList = acl_Object_IdentityRepository.findAll();
        assertThat(acl_Object_IdentityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcl_Object_Identity() throws Exception {
        // Initialize the database
        acl_Object_IdentityService.save(acl_Object_Identity);

        int databaseSizeBeforeDelete = acl_Object_IdentityRepository.findAll().size();

        // Delete the acl_Object_Identity
        restAcl_Object_IdentityMockMvc.perform(delete("/api/acl-object-identities/{id}", acl_Object_Identity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AclObjectIdentity> acl_Object_IdentityList = acl_Object_IdentityRepository.findAll();
        assertThat(acl_Object_IdentityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AclObjectIdentity.class);
        AclObjectIdentity acl_Object_Identity1 = new AclObjectIdentity();
        acl_Object_Identity1.setId(1L);
        AclObjectIdentity acl_Object_Identity2 = new AclObjectIdentity();
        acl_Object_Identity2.setId(acl_Object_Identity1.getId());
        assertThat(acl_Object_Identity1).isEqualTo(acl_Object_Identity2);
        acl_Object_Identity2.setId(2L);
        assertThat(acl_Object_Identity1).isNotEqualTo(acl_Object_Identity2);
        acl_Object_Identity1.setId(null);
        assertThat(acl_Object_Identity1).isNotEqualTo(acl_Object_Identity2);
    }
}
