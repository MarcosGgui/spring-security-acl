import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcl_Class } from 'app/shared/model/acl-class.model';

@Component({
    selector: 'jhi-acl-class-detail',
    templateUrl: './acl-class-detail.component.html'
})
export class Acl_ClassDetailComponent implements OnInit {
    acl_Class: IAcl_Class;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Class }) => {
            this.acl_Class = acl_Class;
        });
    }

    previousState() {
        window.history.back();
    }
}
