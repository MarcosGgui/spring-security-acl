package com.spring.security.acl.web.rest;

import com.spring.security.acl.SpringSecurityAclApp;

import com.spring.security.acl.domain.AclEntry;
import com.spring.security.acl.repository.AclEntryRepository;
import com.spring.security.acl.service.AclEntryService;
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
 * Test class for the AclEntryResource REST controller.
 *
 * @see AclEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringSecurityAclApp.class)
public class AclEntryResourceIntTest {

    private static final Integer DEFAULT_ACL_OBJECT_IDENTITY = 1;
    private static final Integer UPDATED_ACL_OBJECT_IDENTITY = 2;

    private static final Integer DEFAULT_ACE_ORDER = 1;
    private static final Integer UPDATED_ACE_ORDER = 2;

    private static final Integer DEFAULT_SID = 1;
    private static final Integer UPDATED_SID = 2;

    private static final Integer DEFAULT_MASK = 1;
    private static final Integer UPDATED_MASK = 2;

    private static final Integer DEFAULT_GRANTING = 1;
    private static final Integer UPDATED_GRANTING = 2;

    private static final Integer DEFAULT_AUDIT_SUCCESS = 1;
    private static final Integer UPDATED_AUDIT_SUCCESS = 2;

    private static final Integer DEFAULT_AUDIT_FAILURE = 1;
    private static final Integer UPDATED_AUDIT_FAILURE = 2;

    @Autowired
    private AclEntryRepository aclEntryRepository;

    @Autowired
    private AclEntryService aclEntryService;

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

    private MockMvc restAclEntryMockMvc;

    private AclEntry aclEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AclEntryResource aclEntryResource = new AclEntryResource(aclEntryService);
        this.restAclEntryMockMvc = MockMvcBuilders.standaloneSetup(aclEntryResource)
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
    public static AclEntry createEntity(EntityManager em) {
        AclEntry aclEntry = new AclEntry()
            .aclObjectIdentity(DEFAULT_ACL_OBJECT_IDENTITY)
            .aceOrder(DEFAULT_ACE_ORDER)
            .sid(DEFAULT_SID)
            .mask(DEFAULT_MASK)
            .granting(DEFAULT_GRANTING)
            .auditSuccess(DEFAULT_AUDIT_SUCCESS)
            .auditFailure(DEFAULT_AUDIT_FAILURE);
        return aclEntry;
    }

    @Before
    public void initTest() {
        aclEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createAclEntry() throws Exception {
        int databaseSizeBeforeCreate = aclEntryRepository.findAll().size();

        // Create the AclEntry
        restAclEntryMockMvc.perform(post("/api/acl-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aclEntry)))
            .andExpect(status().isCreated());

        // Validate the AclEntry in the database
        List<AclEntry> aclEntryList = aclEntryRepository.findAll();
        assertThat(aclEntryList).hasSize(databaseSizeBeforeCreate + 1);
        AclEntry testAclEntry = aclEntryList.get(aclEntryList.size() - 1);
        assertThat(testAclEntry.getAclObjectIdentity()).isEqualTo(DEFAULT_ACL_OBJECT_IDENTITY);
        assertThat(testAclEntry.getAceOrder()).isEqualTo(DEFAULT_ACE_ORDER);
        assertThat(testAclEntry.getSid()).isEqualTo(DEFAULT_SID);
        assertThat(testAclEntry.getMask()).isEqualTo(DEFAULT_MASK);
        assertThat(testAclEntry.getGranting()).isEqualTo(DEFAULT_GRANTING);
        assertThat(testAclEntry.getAuditSuccess()).isEqualTo(DEFAULT_AUDIT_SUCCESS);
        assertThat(testAclEntry.getAuditFailure()).isEqualTo(DEFAULT_AUDIT_FAILURE);
    }

    @Test
    @Transactional
    public void createAclEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aclEntryRepository.findAll().size();

        // Create the AclEntry with an existing ID
        aclEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAclEntryMockMvc.perform(post("/api/acl-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aclEntry)))
            .andExpect(status().isBadRequest());

        // Validate the AclEntry in the database
        List<AclEntry> aclEntryList = aclEntryRepository.findAll();
        assertThat(aclEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAclEntries() throws Exception {
        // Initialize the database
        aclEntryRepository.saveAndFlush(aclEntry);

        // Get all the aclEntryList
        restAclEntryMockMvc.perform(get("/api/acl-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aclEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].aclObjectIdentity").value(hasItem(DEFAULT_ACL_OBJECT_IDENTITY)))
            .andExpect(jsonPath("$.[*].aceOrder").value(hasItem(DEFAULT_ACE_ORDER)))
            .andExpect(jsonPath("$.[*].sid").value(hasItem(DEFAULT_SID)))
            .andExpect(jsonPath("$.[*].mask").value(hasItem(DEFAULT_MASK)))
            .andExpect(jsonPath("$.[*].granting").value(hasItem(DEFAULT_GRANTING)))
            .andExpect(jsonPath("$.[*].auditSuccess").value(hasItem(DEFAULT_AUDIT_SUCCESS)))
            .andExpect(jsonPath("$.[*].auditFailure").value(hasItem(DEFAULT_AUDIT_FAILURE)));
    }
    
    @Test
    @Transactional
    public void getAclEntry() throws Exception {
        // Initialize the database
        aclEntryRepository.saveAndFlush(aclEntry);

        // Get the aclEntry
        restAclEntryMockMvc.perform(get("/api/acl-entries/{id}", aclEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aclEntry.getId().intValue()))
            .andExpect(jsonPath("$.aclObjectIdentity").value(DEFAULT_ACL_OBJECT_IDENTITY))
            .andExpect(jsonPath("$.aceOrder").value(DEFAULT_ACE_ORDER))
            .andExpect(jsonPath("$.sid").value(DEFAULT_SID))
            .andExpect(jsonPath("$.mask").value(DEFAULT_MASK))
            .andExpect(jsonPath("$.granting").value(DEFAULT_GRANTING))
            .andExpect(jsonPath("$.auditSuccess").value(DEFAULT_AUDIT_SUCCESS))
            .andExpect(jsonPath("$.auditFailure").value(DEFAULT_AUDIT_FAILURE));
    }

    @Test
    @Transactional
    public void getNonExistingAclEntry() throws Exception {
        // Get the aclEntry
        restAclEntryMockMvc.perform(get("/api/acl-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAclEntry() throws Exception {
        // Initialize the database
        aclEntryService.save(aclEntry);

        int databaseSizeBeforeUpdate = aclEntryRepository.findAll().size();

        // Update the aclEntry
        AclEntry updatedAclEntry = aclEntryRepository.findById(aclEntry.getId()).get();
        // Disconnect from session so that the updates on updatedAclEntry are not directly saved in db
        em.detach(updatedAclEntry);
        updatedAclEntry
            .aclObjectIdentity(UPDATED_ACL_OBJECT_IDENTITY)
            .aceOrder(UPDATED_ACE_ORDER)
            .sid(UPDATED_SID)
            .mask(UPDATED_MASK)
            .granting(UPDATED_GRANTING)
            .auditSuccess(UPDATED_AUDIT_SUCCESS)
            .auditFailure(UPDATED_AUDIT_FAILURE);

        restAclEntryMockMvc.perform(put("/api/acl-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAclEntry)))
            .andExpect(status().isOk());

        // Validate the AclEntry in the database
        List<AclEntry> aclEntryList = aclEntryRepository.findAll();
        assertThat(aclEntryList).hasSize(databaseSizeBeforeUpdate);
        AclEntry testAclEntry = aclEntryList.get(aclEntryList.size() - 1);
        assertThat(testAclEntry.getAclObjectIdentity()).isEqualTo(UPDATED_ACL_OBJECT_IDENTITY);
        assertThat(testAclEntry.getAceOrder()).isEqualTo(UPDATED_ACE_ORDER);
        assertThat(testAclEntry.getSid()).isEqualTo(UPDATED_SID);
        assertThat(testAclEntry.getMask()).isEqualTo(UPDATED_MASK);
        assertThat(testAclEntry.getGranting()).isEqualTo(UPDATED_GRANTING);
        assertThat(testAclEntry.getAuditSuccess()).isEqualTo(UPDATED_AUDIT_SUCCESS);
        assertThat(testAclEntry.getAuditFailure()).isEqualTo(UPDATED_AUDIT_FAILURE);
    }

    @Test
    @Transactional
    public void updateNonExistingAclEntry() throws Exception {
        int databaseSizeBeforeUpdate = aclEntryRepository.findAll().size();

        // Create the AclEntry

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAclEntryMockMvc.perform(put("/api/acl-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aclEntry)))
            .andExpect(status().isBadRequest());

        // Validate the AclEntry in the database
        List<AclEntry> aclEntryList = aclEntryRepository.findAll();
        assertThat(aclEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAclEntry() throws Exception {
        // Initialize the database
        aclEntryService.save(aclEntry);

        int databaseSizeBeforeDelete = aclEntryRepository.findAll().size();

        // Delete the aclEntry
        restAclEntryMockMvc.perform(delete("/api/acl-entries/{id}", aclEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AclEntry> aclEntryList = aclEntryRepository.findAll();
        assertThat(aclEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AclEntry.class);
        AclEntry aclEntry1 = new AclEntry();
        aclEntry1.setId(1L);
        AclEntry aclEntry2 = new AclEntry();
        aclEntry2.setId(aclEntry1.getId());
        assertThat(aclEntry1).isEqualTo(aclEntry2);
        aclEntry2.setId(2L);
        assertThat(aclEntry1).isNotEqualTo(aclEntry2);
        aclEntry1.setId(null);
        assertThat(aclEntry1).isNotEqualTo(aclEntry2);
    }
}
