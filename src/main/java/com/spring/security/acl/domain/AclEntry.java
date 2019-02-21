package com.spring.security.acl.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AclEntry.
 */
@Entity
@Table(name = "acl_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AclEntry implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "acl_object_identity")
    private Integer aclObjectIdentity;

    @Column(name = "ace_order")
    private Integer aceOrder;

    @Column(name = "sid")
    private Integer sid;

    @Column(name = "mask")
    private Integer mask;

    @Column(name = "granting")
    private Integer granting;

    @Column(name = "audit_success")
    private Integer auditSuccess;

    @Column(name = "audit_failure")
    private Integer auditFailure;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAclObjectIdentity() {
        return aclObjectIdentity;
    }

    public AclEntry aclObjectIdentity(Integer aclObjectIdentity) {
        this.aclObjectIdentity = aclObjectIdentity;
        return this;
    }

    public void setAclObjectIdentity(Integer aclObjectIdentity) {
        this.aclObjectIdentity = aclObjectIdentity;
    }

    public Integer getAceOrder() {
        return aceOrder;
    }

    public AclEntry aceOrder(Integer aceOrder) {
        this.aceOrder = aceOrder;
        return this;
    }

    public void setAceOrder(Integer aceOrder) {
        this.aceOrder = aceOrder;
    }

    public Integer getSid() {
        return sid;
    }

    public AclEntry sid(Integer sid) {
        this.sid = sid;
        return this;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getMask() {
        return mask;
    }

    public AclEntry mask(Integer mask) {
        this.mask = mask;
        return this;
    }

    public void setMask(Integer mask) {
        this.mask = mask;
    }

    public Integer getGranting() {
        return granting;
    }

    public AclEntry granting(Integer granting) {
        this.granting = granting;
        return this;
    }

    public void setGranting(Integer granting) {
        this.granting = granting;
    }

    public Integer getAuditSuccess() {
        return auditSuccess;
    }

    public AclEntry auditSuccess(Integer auditSuccess) {
        this.auditSuccess = auditSuccess;
        return this;
    }

    public void setAuditSuccess(Integer auditSuccess) {
        this.auditSuccess = auditSuccess;
    }

    public Integer getAuditFailure() {
        return auditFailure;
    }

    public AclEntry auditFailure(Integer auditFailure) {
        this.auditFailure = auditFailure;
        return this;
    }

    public void setAuditFailure(Integer auditFailure) {
        this.auditFailure = auditFailure;
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
        AclEntry aclEntry = (AclEntry) o;
        if (aclEntry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aclEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AclEntry{" +
            "id=" + getId() +
            ", aclObjectIdentity=" + getAclObjectIdentity() +
            ", aceOrder=" + getAceOrder() +
            ", sid=" + getSid() +
            ", mask=" + getMask() +
            ", granting=" + getGranting() +
            ", auditSuccess=" + getAuditSuccess() +
            ", auditFailure=" + getAuditFailure() +
            "}";
    }
}
