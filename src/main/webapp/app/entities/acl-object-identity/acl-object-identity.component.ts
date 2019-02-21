import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';
import { AccountService } from 'app/core';
import { Acl_Object_IdentityService } from './acl-object-identity.service';

@Component({
    selector: 'jhi-acl-object-identity',
    templateUrl: './acl-object-identity.component.html'
})
export class Acl_Object_IdentityComponent implements OnInit, OnDestroy {
    acl_Object_Identities: IAcl_Object_Identity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acl_Object_IdentityService: Acl_Object_IdentityService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acl_Object_IdentityService
            .query()
            .pipe(
                filter((res: HttpResponse<IAcl_Object_Identity[]>) => res.ok),
                map((res: HttpResponse<IAcl_Object_Identity[]>) => res.body)
            )
            .subscribe(
                (res: IAcl_Object_Identity[]) => {
                    this.acl_Object_Identities = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAcl_Object_Identities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAcl_Object_Identity) {
        return item.id;
    }

    registerChangeInAcl_Object_Identities() {
        this.eventSubscriber = this.eventManager.subscribe('acl_Object_IdentityListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
