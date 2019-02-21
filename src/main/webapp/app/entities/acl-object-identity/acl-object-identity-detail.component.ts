import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAclObjectIdentity } from 'app/shared/model/acl-object-identity.model';

@Component({
    selector: 'jhi-acl-object-identity-detail',
    templateUrl: './acl-object-identity-detail.component.html'
})
export class AclObjectIdentityDetailComponent implements OnInit {
    acl_Object_Identity: IAclObjectIdentity;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Object_Identity }) => {
            this.acl_Object_Identity = acl_Object_Identity;
        });
    }

    previousState() {
        window.history.back();
    }
}
