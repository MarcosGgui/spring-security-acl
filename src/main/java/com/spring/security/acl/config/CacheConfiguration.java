package com.spring.security.acl.config;

import com.spring.security.acl.domain.AclClass;
import com.spring.security.acl.domain.AclObjectIdentity;
import com.spring.security.acl.domain.AclSid;
import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.spring.security.acl.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.spring.security.acl.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.spring.security.acl.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.spring.security.acl.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.spring.security.acl.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.spring.security.acl.domain.NoticeMessage.class.getName(), jcacheConfiguration);
            cm.createCache(AclClass.class.getName(), jcacheConfiguration);
            cm.createCache(AclSid.class.getName(), jcacheConfiguration);
            cm.createCache(AclObjectIdentity.class.getName(), jcacheConfiguration);
            cm.createCache(com.spring.security.acl.domain.AclEntry.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
