package com.spring.security.acl.web.rest;

import com.spring.security.acl.service.AccessGrantService;
import com.spring.security.acl.service.dto.AclDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AclResource{

    private final AccessGrantService aclService;

    @Autowired
    public AclResource(AccessGrantService aclService) {
        this.aclService = aclService;
    }

    @PostMapping("/acl/update-access")
    public void updateAcl(@RequestBody AclDTO aclDTO) throws ClassNotFoundException {
        aclService.updateAcl(aclDTO);
    }
}
