import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

@Component({
    selector: 'jhi-acl-object-identity-detail',
    templateUrl: './acl-object-identity-detail.component.html'
})
export class Acl_Object_IdentityDetailComponent implements OnInit {
    acl_Object_Identity: IAcl_Object_Identity;

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
