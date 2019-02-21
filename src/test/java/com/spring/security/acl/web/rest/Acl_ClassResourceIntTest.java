package com.spring.security.acl.web.rest;

import com.spring.security.acl.SpringSecurityAclApp;

import com.spring.security.acl.domain.AclClass;
import com.spring.security.acl.repository.AclClassRepository;
import com.spring.security.acl.service.AclClassService;
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
 * Test class for the Acl_ClassResource REST controller.
 *
 * @see AclClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringSecurityAclApp.class)
public class Acl_ClassResourceIntTest {

    private static final String DEFAULT_CLASS_PATH = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_PATH = "BBBBBBBBBB";

    @Autowired
    private AclClassRepository acl_ClassRepository;

    @Autowired
    private AclClassService acl_ClassService;

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

    private MockMvc restAcl_ClassMockMvc;

    private AclClass acl_Class;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AclClassResource acl_ClassResource = new AclClassResource(acl_ClassService);
        this.restAcl_ClassMockMvc = MockMvcBuilders.standaloneSetup(acl_ClassResource)
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
    public static AclClass createEntity(EntityManager em) {
        AclClass acl_Class = new AclClass()
            .classPath(DEFAULT_CLASS_PATH);
        return acl_Class;
    }

    @Before
    public void initTest() {
        acl_Class = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcl_Class() throws Exception {
        int databaseSizeBeforeCreate = acl_ClassRepository.findAll().size();

        // Create the AclClass
        restAcl_ClassMockMvc.perform(post("/api/acl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Class)))
            .andExpect(status().isCreated());

        // Validate the AclClass in the database
        List<AclClass> acl_ClassList = acl_ClassRepository.findAll();
        assertThat(acl_ClassList).hasSize(databaseSizeBeforeCreate + 1);
        AclClass testAcl_Class = acl_ClassList.get(acl_ClassList.size() - 1);
        assertThat(testAcl_Class.getClassPath()).isEqualTo(DEFAULT_CLASS_PATH);
    }

    @Test
    @Transactional
    public void createAcl_ClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acl_ClassRepository.findAll().size();

        // Create the AclClass with an existing ID
        acl_Class.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcl_ClassMockMvc.perform(post("/api/acl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Class)))
            .andExpect(status().isBadRequest());

        // Validate the AclClass in the database
        List<AclClass> acl_ClassList = acl_ClassRepository.findAll();
        assertThat(acl_ClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcl_Classes() throws Exception {
        // Initialize the database
        acl_ClassRepository.saveAndFlush(acl_Class);

        // Get all the acl_ClassList
        restAcl_ClassMockMvc.perform(get("/api/acl-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acl_Class.getId().intValue())))
            .andExpect(jsonPath("$.[*].classPath").value(hasItem(DEFAULT_CLASS_PATH.toString())));
    }
    
    @Test
    @Transactional
    public void getAcl_Class() throws Exception {
        // Initialize the database
        acl_ClassRepository.saveAndFlush(acl_Class);

        // Get the acl_Class
        restAcl_ClassMockMvc.perform(get("/api/acl-classes/{id}", acl_Class.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acl_Class.getId().intValue()))
            .andExpect(jsonPath("$.classPath").value(DEFAULT_CLASS_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcl_Class() throws Exception {
        // Get the acl_Class
        restAcl_ClassMockMvc.perform(get("/api/acl-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcl_Class() throws Exception {
        // Initialize the database
        acl_ClassService.save(acl_Class);

        int databaseSizeBeforeUpdate = acl_ClassRepository.findAll().size();

        // Update the acl_Class
        AclClass updatedAcl_Class = acl_ClassRepository.findById(acl_Class.getId()).get();
        // Disconnect from session so that the updates on updatedAcl_Class are not directly saved in db
        em.detach(updatedAcl_Class);
        updatedAcl_Class
            .classPath(UPDATED_CLASS_PATH);

        restAcl_ClassMockMvc.perform(put("/api/acl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcl_Class)))
            .andExpect(status().isOk());

        // Validate the AclClass in the database
        List<AclClass> acl_ClassList = acl_ClassRepository.findAll();
        assertThat(acl_ClassList).hasSize(databaseSizeBeforeUpdate);
        AclClass testAcl_Class = acl_ClassList.get(acl_ClassList.size() - 1);
        assertThat(testAcl_Class.getClassPath()).isEqualTo(UPDATED_CLASS_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingAcl_Class() throws Exception {
        int databaseSizeBeforeUpdate = acl_ClassRepository.findAll().size();

        // Create the AclClass

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcl_ClassMockMvc.perform(put("/api/acl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acl_Class)))
            .andExpect(status().isBadRequest());

        // Validate the AclClass in the database
        List<AclClass> acl_ClassList = acl_ClassRepository.findAll();
        assertThat(acl_ClassList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcl_Class() throws Exception {
        // Initialize the database
        acl_ClassService.save(acl_Class);

        int databaseSizeBeforeDelete = acl_ClassRepository.findAll().size();

        // Delete the acl_Class
        restAcl_ClassMockMvc.perform(delete("/api/acl-classes/{id}", acl_Class.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AclClass> acl_ClassList = acl_ClassRepository.findAll();
        assertThat(acl_ClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AclClass.class);
        AclClass acl_Class1 = new AclClass();
        acl_Class1.setId(1L);
        AclClass acl_Class2 = new AclClass();
        acl_Class2.setId(acl_Class1.getId());
        assertThat(acl_Class1).isEqualTo(acl_Class2);
        acl_Class2.setId(2L);
        assertThat(acl_Class1).isNotEqualTo(acl_Class2);
        acl_Class1.setId(null);
        assertThat(acl_Class1).isNotEqualTo(acl_Class2);
    }
}
