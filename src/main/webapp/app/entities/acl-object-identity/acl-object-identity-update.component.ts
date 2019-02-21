import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';
import { Acl_Object_IdentityService } from './acl-object-identity.service';
import { IAcl_Class } from 'app/shared/model/acl-class.model';
import { Acl_ClassService } from 'app/entities/acl-class';
import { IAcl_Sid } from 'app/shared/model/acl-sid.model';
import { Acl_SidService } from 'app/entities/acl-sid';

@Component({
    selector: 'jhi-acl-object-identity-update',
    templateUrl: './acl-object-identity-update.component.html'
})
export class Acl_Object_IdentityUpdateComponent implements OnInit {
    acl_Object_Identity: IAcl_Object_Identity;
    isSaving: boolean;

    acl_classes: IAcl_Class[];

    acl_sids: IAcl_Sid[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acl_Object_IdentityService: Acl_Object_IdentityService,
        protected acl_ClassService: Acl_ClassService,
        protected acl_sidService: Acl_SidService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acl_Object_Identity }) => {
            this.acl_Object_Identity = acl_Object_Identity;
        });
        this.acl_ClassService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAcl_Class[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAcl_Class[]>) => response.body)
            )
            .subscribe((res: IAcl_Class[]) => (this.acl_classes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.acl_sidService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAcl_Sid[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAcl_Sid[]>) => response.body)
            )
            .subscribe((res: IAcl_Sid[]) => (this.acl_sids = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acl_Object_Identity.id !== undefined) {
            this.subscribeToSaveResponse(this.acl_Object_IdentityService.update(this.acl_Object_Identity));
        } else {
            this.subscribeToSaveResponse(this.acl_Object_IdentityService.create(this.acl_Object_Identity));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcl_Object_Identity>>) {
        result.subscribe((res: HttpResponse<IAcl_Object_Identity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAcl_ClassById(index: number, item: IAcl_Class) {
        return item.id;
    }

    trackAcl_sidById(index: number, item: IAcl_Sid) {
        return item.id;
    }
}
