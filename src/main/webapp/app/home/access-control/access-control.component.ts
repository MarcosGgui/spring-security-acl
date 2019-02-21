import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User, UserService } from 'app/core';
import { AclSidService } from 'app/entities/acl-sid';
import { AclClassService } from 'app/entities/acl-class';
import { AclObjectIdentityService } from 'app/entities/acl-object-identity';
import { AclEntryService } from 'app/entities/acl-entry';
import { AclSid } from 'app/shared/model/acl-sid.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AclClass } from 'app/shared/model/acl-class.model';
import { AclObjectIdentity } from 'app/shared/model/acl-object-identity.model';
import { AclEntry } from 'app/shared/model/acl-entry.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-access-control',
    templateUrl: './access-control.component.html',
    styles: []
})
export class AccessControlComponent implements OnInit {
    private users: User[] = [];

    private accessUser: User;
    private className: string;
    private access: string;
    private aclSid: AclSid = new AclSid();
    private aclClass: AclClass = new AclClass();
    private aclObjectIdentity: AclObjectIdentity = new AclObjectIdentity();
    private aclEntry: AclEntry = new AclEntry();

    constructor(
        private jhiAlertService: JhiAlertService,
        private userService: UserService,
        private aclClassService: AclClassService,
        private aclSidService: AclSidService,
        private aclObjectIdentityService: AclObjectIdentityService,
        private aclEntryService: AclEntryService,
        private modalService: NgbModal
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
        this.aclSid.principal = 1;
        this.aclSid.sid = this.accessUser.login;
        this.aclSidService.create(this.aclSid).subscribe((res: HttpResponse<any>) => {
            this.aclSid = res.body;
            this.addSidClass();
        });
    }

    addSidClass() {
        this.aclClass.classPath = this.className;

        this.aclClassService.create(this.aclClass).subscribe(
            (res: HttpResponse<any>) => {
                this.aclClass = res.body;
                this.addObjectIdIdentity();
            },
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    addObjectIdIdentity() {
        this.aclObjectIdentity.objectIdIdentity = '1';
        this.aclObjectIdentity.entriesInheriting = 1;
        this.aclObjectIdentity.objectIdClass = this.aclClass.id;
        this.aclObjectIdentity.ownerSid = this.aclSid.id;

        this.aclObjectIdentityService.create(this.aclObjectIdentity).subscribe(
            (res: HttpResponse<AclObjectIdentity>) => {
                this.aclObjectIdentity = res.body;
                this.addAclEntry();
            },
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    addAclEntry() {
        this.aclEntry.mask = Number.parseInt(this.access);
        this.aclEntry.aceOrder = 1;
        this.aclEntry.granting = 1;
        this.aclEntry.auditFailure = 1;
        this.aclEntry.auditSuccess = 1;
        this.aclEntry.sid = this.aclSid.id;
        this.aclEntry.aclObjectIdentity = this.aclObjectIdentity.id;
        this.aclEntryService.create(this.aclEntry).subscribe(res => {}, (res: HttpErrorResponse) => this.onError(res.error));
    }

    addAccess() {
        this.addSid();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
