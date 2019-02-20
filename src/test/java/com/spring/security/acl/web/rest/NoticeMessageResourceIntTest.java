package com.spring.security.acl.web.rest;

import com.spring.security.acl.SpringSecurityAclApp;

import com.spring.security.acl.domain.NoticeMessage;
import com.spring.security.acl.repository.NoticeMessageRepository;
import com.spring.security.acl.service.NoticeMessageService;
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
 * Test class for the NoticeMessageResource REST controller.
 *
 * @see NoticeMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringSecurityAclApp.class)
public class NoticeMessageResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private NoticeMessageRepository noticeMessageRepository;

    @Autowired
    private NoticeMessageService noticeMessageService;

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

    private MockMvc restNoticeMessageMockMvc;

    private NoticeMessage noticeMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoticeMessageResource noticeMessageResource = new NoticeMessageResource(noticeMessageService);
        this.restNoticeMessageMockMvc = MockMvcBuilders.standaloneSetup(noticeMessageResource)
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
    public static NoticeMessage createEntity(EntityManager em) {
        NoticeMessage noticeMessage = new NoticeMessage()
            .content(DEFAULT_CONTENT);
        return noticeMessage;
    }

    @Before
    public void initTest() {
        noticeMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoticeMessage() throws Exception {
        int databaseSizeBeforeCreate = noticeMessageRepository.findAll().size();

        // Create the NoticeMessage
        restNoticeMessageMockMvc.perform(post("/api/notice-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noticeMessage)))
            .andExpect(status().isCreated());

        // Validate the NoticeMessage in the database
        List<NoticeMessage> noticeMessageList = noticeMessageRepository.findAll();
        assertThat(noticeMessageList).hasSize(databaseSizeBeforeCreate + 1);
        NoticeMessage testNoticeMessage = noticeMessageList.get(noticeMessageList.size() - 1);
        assertThat(testNoticeMessage.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createNoticeMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noticeMessageRepository.findAll().size();

        // Create the NoticeMessage with an existing ID
        noticeMessage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoticeMessageMockMvc.perform(post("/api/notice-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noticeMessage)))
            .andExpect(status().isBadRequest());

        // Validate the NoticeMessage in the database
        List<NoticeMessage> noticeMessageList = noticeMessageRepository.findAll();
        assertThat(noticeMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNoticeMessages() throws Exception {
        // Initialize the database
        noticeMessageRepository.saveAndFlush(noticeMessage);

        // Get all the noticeMessageList
        restNoticeMessageMockMvc.perform(get("/api/notice-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noticeMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getNoticeMessage() throws Exception {
        // Initialize the database
        noticeMessageRepository.saveAndFlush(noticeMessage);

        // Get the noticeMessage
        restNoticeMessageMockMvc.perform(get("/api/notice-messages/{id}", noticeMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noticeMessage.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNoticeMessage() throws Exception {
        // Get the noticeMessage
        restNoticeMessageMockMvc.perform(get("/api/notice-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoticeMessage() throws Exception {
        // Initialize the database
        noticeMessageService.save(noticeMessage);

        int databaseSizeBeforeUpdate = noticeMessageRepository.findAll().size();

        // Update the noticeMessage
        NoticeMessage updatedNoticeMessage = noticeMessageRepository.findById(noticeMessage.getId()).get();
        // Disconnect from session so that the updates on updatedNoticeMessage are not directly saved in db
        em.detach(updatedNoticeMessage);
        updatedNoticeMessage
            .content(UPDATED_CONTENT);

        restNoticeMessageMockMvc.perform(put("/api/notice-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoticeMessage)))
            .andExpect(status().isOk());

        // Validate the NoticeMessage in the database
        List<NoticeMessage> noticeMessageList = noticeMessageRepository.findAll();
        assertThat(noticeMessageList).hasSize(databaseSizeBeforeUpdate);
        NoticeMessage testNoticeMessage = noticeMessageList.get(noticeMessageList.size() - 1);
        assertThat(testNoticeMessage.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingNoticeMessage() throws Exception {
        int databaseSizeBeforeUpdate = noticeMessageRepository.findAll().size();

        // Create the NoticeMessage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoticeMessageMockMvc.perform(put("/api/notice-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noticeMessage)))
            .andExpect(status().isBadRequest());

        // Validate the NoticeMessage in the database
        List<NoticeMessage> noticeMessageList = noticeMessageRepository.findAll();
        assertThat(noticeMessageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNoticeMessage() throws Exception {
        // Initialize the database
        noticeMessageService.save(noticeMessage);

        int databaseSizeBeforeDelete = noticeMessageRepository.findAll().size();

        // Delete the noticeMessage
        restNoticeMessageMockMvc.perform(delete("/api/notice-messages/{id}", noticeMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NoticeMessage> noticeMessageList = noticeMessageRepository.findAll();
        assertThat(noticeMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoticeMessage.class);
        NoticeMessage noticeMessage1 = new NoticeMessage();
        noticeMessage1.setId(1L);
        NoticeMessage noticeMessage2 = new NoticeMessage();
        noticeMessage2.setId(noticeMessage1.getId());
        assertThat(noticeMessage1).isEqualTo(noticeMessage2);
        noticeMessage2.setId(2L);
        assertThat(noticeMessage1).isNotEqualTo(noticeMessage2);
        noticeMessage1.setId(null);
        assertThat(noticeMessage1).isNotEqualTo(noticeMessage2);
    }
}
