import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcl_Sid } from 'app/shared/model/acl-sid.model';
import { AccountService } from 'app/core';
import { Acl_SidService } from './acl-sid.service';

@Component({
    selector: 'jhi-acl-sid',
    templateUrl: './acl-sid.component.html'
})
export class Acl_SidComponent implements OnInit, OnDestroy {
    acl_Sids: IAcl_Sid[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acl_SidService: Acl_SidService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acl_SidService
            .query()
            .pipe(
                filter((res: HttpResponse<IAcl_Sid[]>) => res.ok),
                map((res: HttpResponse<IAcl_Sid[]>) => res.body)
            )
            .subscribe(
                (res: IAcl_Sid[]) => {
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

    trackId(index: number, item: IAcl_Sid) {
        return item.id;
    }

    registerChangeInAcl_Sids() {
        this.eventSubscriber = this.eventManager.subscribe('acl_SidListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
