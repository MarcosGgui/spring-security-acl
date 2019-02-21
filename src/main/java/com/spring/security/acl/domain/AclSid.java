package com.spring.security.acl.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AclSid.
 */
@Entity
@Table(name = "acl_sid")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AclSid implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "principal")
    private Integer principal;

    @Column(name = "sid")
    private String sid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrincipal() {
        return principal;
    }

    public AclSid principal(Integer principal) {
        this.principal = principal;
        return this;
    }

    public void setPrincipal(Integer principal) {
        this.principal = principal;
    }

    public String getSid() {
        return sid;
    }

    public AclSid sid(String sid) {
        this.sid = sid;
        return this;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AclSid aclSid = (AclSid) o;
        if (aclSid.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aclSid.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AclSid{" +
            "id=" + getId() +
            ", principal=" + getPrincipal() +
            ", sid='" + getSid() + "'" +
            "}";
    }
}
