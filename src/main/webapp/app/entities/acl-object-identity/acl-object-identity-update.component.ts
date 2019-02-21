import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAclObjectIdentity } from 'app/shared/model/acl-object-identity.model';
import { AclObjectIdentityService } from './acl-object-identity.service';
import { IAclClass } from 'app/shared/model/acl-class.model';
import { AclClassService } from 'app/entities/acl-class';
import { IAclSid } from 'app/shared/model/acl-sid.model';
import { AclSidService } from 'app/entities/acl-sid';

@Component({
    selector: 'jhi-acl-object-identity-update',
    templateUrl: './acl-object-identity-update.component.html'
})
export class AclObjectIdentityUpdateComponent implements OnInit {
    acl_Object_Identity: IAclObjectIdentity;
    isSaving: boolean;

    acl_classes: IAclClass[];

    acl_sids: IAclSid[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acl_Object_IdentityService: AclObjectIdentityService,
        protected acl_ClassService: AclClassService,
        protected acl_sidService: AclSidService,
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
                filter((mayBeOk: HttpResponse<IAclClass[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAclClass[]>) => response.body)
            )
            .subscribe((res: IAclClass[]) => (this.acl_classes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.acl_sidService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAclSid[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAclSid[]>) => response.body)
            )
            .subscribe((res: IAclSid[]) => (this.acl_sids = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAclObjectIdentity>>) {
        result.subscribe((res: HttpResponse<IAclObjectIdentity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAcl_ClassById(index: number, item: IAclClass) {
        return item.id;
    }

    trackAcl_sidById(index: number, item: IAclSid) {
        return item.id;
    }
}
