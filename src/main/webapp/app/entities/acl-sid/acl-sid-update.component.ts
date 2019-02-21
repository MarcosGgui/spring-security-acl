import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAcl_Sid } from 'app/shared/model/acl-sid.model';
import { Acl_SidService } from './acl-sid.service';

@Component({
    selector: 'jhi-acl-sid-update',
    templateUrl: './acl-sid-update.component.html'
})
export class Acl_SidUpdateComponent implements OnInit {
    acl_Sid: IAcl_Sid;
    isSaving: boolean;

    constructor(protected acl_SidService: Acl_SidService, protected activatedRoute: ActivatedRoute) {}

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

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcl_Sid>>) {
        result.subscribe((res: HttpResponse<IAcl_Sid>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
