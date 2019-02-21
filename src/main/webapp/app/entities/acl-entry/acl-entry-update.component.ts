import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAclEntry } from 'app/shared/model/acl-entry.model';
import { AclEntryService } from './acl-entry.service';

@Component({
    selector: 'jhi-acl-entry-update',
    templateUrl: './acl-entry-update.component.html'
})
export class AclEntryUpdateComponent implements OnInit {
    aclEntry: IAclEntry;
    isSaving: boolean;

    constructor(protected aclEntryService: AclEntryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aclEntry }) => {
            this.aclEntry = aclEntry;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.aclEntry.id !== undefined) {
            this.subscribeToSaveResponse(this.aclEntryService.update(this.aclEntry));
        } else {
            this.subscribeToSaveResponse(this.aclEntryService.create(this.aclEntry));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAclEntry>>) {
        result.subscribe((res: HttpResponse<IAclEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
