package com.spring.security.acl.service;

import com.spring.security.acl.service.dto.AclDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.security.acls.jdbc.JdbcMutableAclService;
import org.springframework.security.acls.model.MutableAcl;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.security.acls.model.ObjectIdentity;
import org.springframework.security.acls.model.Permission;
import org.springframework.security.acls.model.Sid;
import org.springframework.stereotype.Service;

@Service
public class AccessGrantService{

    @Autowired
    JdbcMutableAclService aclService;

    public void updateAcl(AclDTO aclDTO) throws ClassNotFoundException {

        ObjectIdentity oi = new ObjectIdentityImpl(getClass().getClassLoader().loadClass(aclDTO.getClassPath()),
            aclDTO.getObjectIdentityId());
        Sid sid = new PrincipalSid(aclDTO.getSid());

        Permission p = getPermission(aclDTO.getPermissionDesc());

        // Create or update the relevant ACL
        MutableAcl acl = null;
        try {
            acl = (MutableAcl) this.aclService.readAclById(oi);
        } catch (NotFoundException nfe) {
            acl = this.aclService.createAcl(oi);
        }

        // Now grant some permissions via an access control entry (ACE)
        acl.insertAce(acl.getEntries().size(), p, sid, true);
        this.aclService.updateAcl(acl);
    }

    private Permission getPermission(String permissionDesc) {
        Permission p = BasePermission.READ;
        switch (permissionDesc) {
            case "Read And Write":
                p = BasePermission.ADMINISTRATION;
                break;
            case "Write":
                p = BasePermission.WRITE;
                break;
            case "Delete":
                p = BasePermission.DELETE;
                break;
            case "Create":
                p = BasePermission.CREATE;
                break;
            default:
                break;
        }
        return p;
    }

}
