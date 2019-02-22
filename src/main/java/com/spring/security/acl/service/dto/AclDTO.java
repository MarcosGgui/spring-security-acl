package com.spring.security.acl.service.dto;

public class AclDTO{

    private String sid;

    private String classPath;

    private Long objectIdentityId;

    private String permissionDesc;

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getClassPath() {
        return classPath;
    }

    public void setClassPath(String classPath) {
        this.classPath = classPath;
    }

    public Long getObjectIdentityId() {
        return objectIdentityId;
    }

    public void setObjectIdentityId(Long objectIdentityId) {
        this.objectIdentityId = objectIdentityId;
    }

    public String getPermissionDesc() {
        return permissionDesc;
    }

    public void setPermissionDesc(String permissionDesc) {
        this.permissionDesc = permissionDesc;
    }


}
