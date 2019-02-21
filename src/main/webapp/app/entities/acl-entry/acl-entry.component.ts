import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAclEntry } from 'app/shared/model/acl-entry.model';
import { AccountService } from 'app/core';
import { AclEntryService } from './acl-entry.service';

@Component({
    selector: 'jhi-acl-entry',
    templateUrl: './acl-entry.component.html'
})
export class AclEntryComponent implements OnInit, OnDestroy {
    aclEntries: IAclEntry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected aclEntryService: AclEntryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.aclEntryService
            .query()
            .pipe(
                filter((res: HttpResponse<IAclEntry[]>) => res.ok),
                map((res: HttpResponse<IAclEntry[]>) => res.body)
            )
            .subscribe(
                (res: IAclEntry[]) => {
                    this.aclEntries = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAclEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAclEntry) {
        return item.id;
    }

    registerChangeInAclEntries() {
        this.eventSubscriber = this.eventManager.subscribe('aclEntryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
