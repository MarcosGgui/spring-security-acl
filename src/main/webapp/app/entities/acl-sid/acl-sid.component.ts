import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAclSid } from 'app/shared/model/acl-sid.model';
import { AccountService } from 'app/core';
import { AclSidService } from './acl-sid.service';

@Component({
    selector: 'jhi-acl-sid',
    templateUrl: './acl-sid.component.html'
})
export class Acl_SidComponent implements OnInit, OnDestroy {
    acl_Sids: IAclSid[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acl_SidService: AclSidService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acl_SidService
            .query()
            .pipe(
                filter((res: HttpResponse<IAclSid[]>) => res.ok),
                map((res: HttpResponse<IAclSid[]>) => res.body)
            )
            .subscribe(
                (res: IAclSid[]) => {
                    this.acl_Sids = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAcl_Sids();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAclSid) {
        return item.id;
    }

    registerChangeInAcl_Sids() {
        this.eventSubscriber = this.eventManager.subscribe('acl_SidListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
