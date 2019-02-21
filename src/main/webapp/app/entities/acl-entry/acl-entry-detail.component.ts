import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAclEntry } from 'app/shared/model/acl-entry.model';

@Component({
    selector: 'jhi-acl-entry-detail',
    templateUrl: './acl-entry-detail.component.html'
})
export class AclEntryDetailComponent implements OnInit {
    aclEntry: IAclEntry;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aclEntry }) => {
            this.aclEntry = aclEntry;
        });
    }

    previousState() {
        window.history.back();
    }
}
