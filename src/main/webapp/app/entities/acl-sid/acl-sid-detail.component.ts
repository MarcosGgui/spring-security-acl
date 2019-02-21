import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcl_Sid } from 'app/shared/model/acl-sid.model';

@Component({
    selector: 'jhi-acl-sid-detail',
    templateUrl: './acl-sid-detail.component.html'
})
export class Acl_SidDetailComponent implements OnInit {
    acl_Sid: IAcl_Sid;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Sid }) => {
            this.acl_Sid = acl_Sid;
        });
    }

    previousState() {
        window.history.back();
    }
}
