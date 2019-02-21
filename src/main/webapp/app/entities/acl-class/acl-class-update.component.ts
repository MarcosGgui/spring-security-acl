import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAclClass } from 'app/shared/model/acl-class.model';
import { AclClassService } from './acl-class.service';

@Component({
    selector: 'jhi-acl-class-update',
    templateUrl: './acl-class-update.component.html'
})
export class AclClassUpdateComponent implements OnInit {
    acl_Class: IAclClass;
    isSaving: boolean;

    constructor(protected acl_ClassService: AclClassService, protected activatedRoute: ActivatedRoute) {}

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

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAclClass>>) {
        result.subscribe((res: HttpResponse<IAclClass>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
