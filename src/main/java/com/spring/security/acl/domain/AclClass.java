package com.spring.security.acl.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AclClass.
 */
@Entity
@Table(name = "acl_class")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AclClass implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class")
    private String classPath;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassPath() {
        return classPath;
    }

    public AclClass classPath(String classPath) {
        this.classPath = classPath;
        return this;
    }

    public void setClassPath(String classPath) {
        this.classPath = classPath;
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
        AclClass aclClass = (AclClass) o;
        if (aclClass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aclClass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AclClass{" +
            "id=" + getId() +
            ", classPath='" + getClassPath() + "'" +
            "}";
    }
}
