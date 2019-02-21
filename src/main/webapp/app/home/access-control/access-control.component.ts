import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'app/core';
import { AclSidService } from 'app/entities/acl-sid';
import { AclClassService } from 'app/entities/acl-class';
import { AclObjectIdentityService } from 'app/entities/acl-object-identity';
import { AclEntryService } from 'app/entities/acl-entry';
import { AclSid } from 'app/shared/model/acl-sid.model';
import { HttpResponse } from '@angular/common/http';
import { AclClass } from 'app/shared/model/acl-class.model';

@Component({
    selector: 'jhi-access-control',
    templateUrl: './access-control.component.html',
    styles: []
})
export class AccessControlComponent implements OnInit {
    private users: User[] = [];

    private accessUser: User;
    private className: string;

    constructor(
        private userService: UserService,
        private aclClassService: AclClassService,
        private aclSidService: AclSidService,
        private aclObjectIdentityService: AclObjectIdentityService,
        private aclEntryService: AclEntryService
    ) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.query().subscribe((res: HttpResponse<any>) => {
            this.users = res.body;
        });
    }

    addSid() {
        const aclSid = new AclSid();
        aclSid.principal = 1;
        aclSid.sid = this.accessUser.login;
        console.log(aclSid);
        this.aclSidService.create(aclSid).subscribe(res => {});
    }

    addSidClass() {
        const aclClass = new AclClass();
        aclClass.classPath = this.className;
        console.log(aclClass);
        this.aclClassService.create(aclClass).subscribe(res => {});
    }
}
