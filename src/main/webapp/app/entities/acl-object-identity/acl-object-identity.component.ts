import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAclObjectIdentity } from 'app/shared/model/acl-object-identity.model';
import { AccountService } from 'app/core';
import { AclObjectIdentityService } from './acl-object-identity.service';

@Component({
    selector: 'jhi-acl-object-identity',
    templateUrl: './acl-object-identity.component.html'
})
export class AclObjectIdentityComponent implements OnInit, OnDestroy {
    acl_Object_Identities: IAclObjectIdentity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acl_Object_IdentityService: AclObjectIdentityService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acl_Object_IdentityService
            .query()
            .pipe(
                filter((res: HttpResponse<IAclObjectIdentity[]>) => res.ok),
                map((res: HttpResponse<IAclObjectIdentity[]>) => res.body)
            )
            .subscribe(
                (res: IAclObjectIdentity[]) => {
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

    trackId(index: number, item: IAclObjectIdentity) {
        return item.id;
    }

    registerChangeInAcl_Object_Identities() {
        this.eventSubscriber = this.eventManager.subscribe('acl_Object_IdentityListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
