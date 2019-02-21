package com.spring.security.acl.web.rest;

import com.spring.security.acl.SpringSecurityAclApp;

import com.spring.security.acl.domain.AclSid;
import com.spring.security.acl.repository.AclSidRepository;
import com.spring.security.acl.service.AclSidService;
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
 * Test class for the Acl_SidResource REST controller.
 *
 * @see AclSidResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringSecurityAclApp.class)
public class Acl_SidResourceIntTest {

    private static final Integer DEFAULT_PRINCIPAL = 1;
    private static final Integer UPDATED_PRINCIPAL = 2;

    private static final String DEFAULT_SID = "AAAAAAAAAA";
    private static final String UPDATED_SID = "BBBBBBBBBB";

    @Autowired
    private AclSidRepository acl_SidRepository;

    @Autowired
    private AclSidService acl_SidService;

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

    private MockMvc restAcl_SidMockMvc;

    private AclSid acl_Sid;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AclSidResource acl_SidResource = new AclSidResource(acl_SidService);
        this.restAcl_SidMockMvc = MockMvcBuilders.standaloneSetup(acl_SidResource)
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
    public static AclSid createEntity(EntityManager em) {
        AclSid acl_Sid = new AclSid()
            .principal(DEFAULT_PRINCIPAL)
            .sid(DEFAULT_SID);
        return acl_Sid;
    }

    @Before
    public void initTest() {
        acl_Sid = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcl_Sid() throws Exception {
        int databaseSizeBeforeCreate = acl_SidRepository.findAll().size();

        // Create the AclSid
        restAcl_SidMockMvc.perform(post("/api/acl-sids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Sid)))
            .andExpect(status().isCreated());

        // Validate the AclSid in the database
        List<AclSid> acl_SidList = acl_SidRepository.findAll();
        assertThat(acl_SidList).hasSize(databaseSizeBeforeCreate + 1);
        AclSid testAcl_Sid = acl_SidList.get(acl_SidList.size() - 1);
        assertThat(testAcl_Sid.getPrincipal()).isEqualTo(DEFAULT_PRINCIPAL);
        assertThat(testAcl_Sid.getSid()).isEqualTo(DEFAULT_SID);
    }

    @Test
    @Transactional
    public void createAcl_SidWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acl_SidRepository.findAll().size();

        // Create the AclSid with an existing ID
        acl_Sid.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcl_SidMockMvc.perform(post("/api/acl-sids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Sid)))
            .andExpect(status().isBadRequest());

        // Validate the AclSid in the database
        List<AclSid> acl_SidList = acl_SidRepository.findAll();
        assertThat(acl_SidList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcl_Sids() throws Exception {
        // Initialize the database
        acl_SidRepository.saveAndFlush(acl_Sid);

        // Get all the acl_SidList
        restAcl_SidMockMvc.perform(get("/api/acl-sids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acl_Sid.getId().intValue())))
            .andExpect(jsonPath("$.[*].principal").value(hasItem(DEFAULT_PRINCIPAL)))
            .andExpect(jsonPath("$.[*].sid").value(hasItem(DEFAULT_SID.toString())));
    }
    
    @Test
    @Transactional
    public void getAcl_Sid() throws Exception {
        // Initialize the database
        acl_SidRepository.saveAndFlush(acl_Sid);

        // Get the acl_Sid
        restAcl_SidMockMvc.perform(get("/api/acl-sids/{id}", acl_Sid.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acl_Sid.getId().intValue()))
            .andExpect(jsonPath("$.principal").value(DEFAULT_PRINCIPAL))
            .andExpect(jsonPath("$.sid").value(DEFAULT_SID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcl_Sid() throws Exception {
        // Get the acl_Sid
        restAcl_SidMockMvc.perform(get("/api/acl-sids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcl_Sid() throws Exception {
        // Initialize the database
        acl_SidService.save(acl_Sid);

        int databaseSizeBeforeUpdate = acl_SidRepository.findAll().size();

        // Update the acl_Sid
        AclSid updatedAcl_Sid = acl_SidRepository.findById(acl_Sid.getId()).get();
        // Disconnect from session so that the updates on updatedAcl_Sid are not directly saved in db
        em.detach(updatedAcl_Sid);
        updatedAcl_Sid
            .principal(UPDATED_PRINCIPAL)
            .sid(UPDATED_SID);

        restAcl_SidMockMvc.perform(put("/api/acl-sids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcl_Sid)))
            .andExpect(status().isOk());

        // Validate the AclSid in the database
        List<AclSid> acl_SidList = acl_SidRepository.findAll();
        assertThat(acl_SidList).hasSize(databaseSizeBeforeUpdate);
        AclSid testAcl_Sid = acl_SidList.get(acl_SidList.size() - 1);
        assertThat(testAcl_Sid.getPrincipal()).isEqualTo(UPDATED_PRINCIPAL);
        assertThat(testAcl_Sid.getSid()).isEqualTo(UPDATED_SID);
    }

    @Test
    @Transactional
    public void updateNonExistingAcl_Sid() throws Exception {
        int databaseSizeBeforeUpdate = acl_SidRepository.findAll().size();

        // Create the AclSid

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcl_SidMockMvc.perform(put("/api/acl-sids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Sid)))
            .andExpect(status().isBadRequest());

        // Validate the AclSid in the database
        List<AclSid> acl_SidList = acl_SidRepository.findAll();
        assertThat(acl_SidList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcl_Sid() throws Exception {
        // Initialize the database
        acl_SidService.save(acl_Sid);

        int databaseSizeBeforeDelete = acl_SidRepository.findAll().size();

        // Delete the acl_Sid
        restAcl_SidMockMvc.perform(delete("/api/acl-sids/{id}", acl_Sid.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AclSid> acl_SidList = acl_SidRepository.findAll();
        assertThat(acl_SidList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AclSid.class);
        AclSid acl_Sid1 = new AclSid();
        acl_Sid1.setId(1L);
        AclSid acl_Sid2 = new AclSid();
        acl_Sid2.setId(acl_Sid1.getId());
        assertThat(acl_Sid1).isEqualTo(acl_Sid2);
        acl_Sid2.setId(2L);
        assertThat(acl_Sid1).isNotEqualTo(acl_Sid2);
        acl_Sid1.setId(null);
        assertThat(acl_Sid1).isNotEqualTo(acl_Sid2);
    }
}
