import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAcl_Class } from 'app/shared/model/acl-class.model';
import { Acl_ClassService } from './acl-class.service';

@Component({
    selector: 'jhi-acl-class-update',
    templateUrl: './acl-class-update.component.html'
})
export class Acl_ClassUpdateComponent implements OnInit {
    acl_Class: IAcl_Class;
    isSaving: boolean;

    constructor(protected acl_ClassService: Acl_ClassService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acl_Class }) => {
            this.acl_Class = acl_Class;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acl_Class.id !== undefined) {
            this.subscribeToSaveResponse(this.acl_ClassService.update(this.acl_Class));
        } else {
            this.subscribeToSaveResponse(this.acl_ClassService.create(this.acl_Class));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcl_Class>>) {
        result.subscribe((res: HttpResponse<IAcl_Class>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
