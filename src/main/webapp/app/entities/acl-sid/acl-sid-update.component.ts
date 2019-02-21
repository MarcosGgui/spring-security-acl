import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAclSid } from 'app/shared/model/acl-sid.model';
import { AclSidService } from './acl-sid.service';

@Component({
    selector: 'jhi-acl-sid-update',
    templateUrl: './acl-sid-update.component.html'
})
export class Acl_SidUpdateComponent implements OnInit {
    acl_Sid: IAclSid;
    isSaving: boolean;

    constructor(protected acl_SidService: AclSidService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acl_Sid }) => {
            this.acl_Sid = acl_Sid;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acl_Sid.id !== undefined) {
            this.subscribeToSaveResponse(this.acl_SidService.update(this.acl_Sid));
        } else {
            this.subscribeToSaveResponse(this.acl_SidService.create(this.acl_Sid));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAclSid>>) {
        result.subscribe((res: HttpResponse<IAclSid>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
