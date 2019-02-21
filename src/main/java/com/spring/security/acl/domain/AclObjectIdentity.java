package com.spring.security.acl.domain;


import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AclObjectIdentity.
 */
@Entity
@Table(name = "acl_object_identity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AclObjectIdentity implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "object_id_class")
    private Integer objectIdClass;

    @Column(name = "object_id_identity")
    private String objectIdIdentity;

    @Column(name = "parent_object")
    private Integer parentObject;

    @Column(name = "owner_sid")
    private Integer ownerSid;

    @Column(name = "entries_inheriting")
    private Integer entriesInheriting;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getObjectIdClass() {
        return objectIdClass;
    }

    public AclObjectIdentity objectIdClass(Integer objectIdClass) {
        this.objectIdClass = objectIdClass;
        return this;
    }

    public void setObjectIdClass(Integer objectIdClass) {
        this.objectIdClass = objectIdClass;
    }

    public String getObjectIdIdentity() {
        return objectIdIdentity;
    }

    public AclObjectIdentity objectIdIdentity(String objectIdIdentity) {
        this.objectIdIdentity = objectIdIdentity;
        return this;
    }

    public void setObjectIdIdentity(String objectIdIdentity) {
        this.objectIdIdentity = objectIdIdentity;
    }

    public Integer getParentObject() {
        return parentObject;
    }

    public AclObjectIdentity parentObject(Integer parentObject) {
        this.parentObject = parentObject;
        return this;
    }

    public void setParentObject(Integer parentObject) {
        this.parentObject = parentObject;
    }

    public Integer getOwnerSid() {
        return ownerSid;
    }

    public AclObjectIdentity ownerSid(Integer ownerSid) {
        this.ownerSid = ownerSid;
        return this;
    }

    public void setOwnerSid(Integer ownerSid) {
        this.ownerSid = ownerSid;
    }

    public Integer getEntriesInheriting() {
        return entriesInheriting;
    }

    public AclObjectIdentity entriesInheriting(Integer entriesInheriting) {
        this.entriesInheriting = entriesInheriting;
        return this;
    }

    public void setEntriesInheriting(Integer entriesInheriting) {
        this.entriesInheriting = entriesInheriting;
    }

}
