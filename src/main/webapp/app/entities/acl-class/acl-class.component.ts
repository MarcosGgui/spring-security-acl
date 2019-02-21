import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAclClass } from 'app/shared/model/acl-class.model';
import { AccountService } from 'app/core';
import { AclClassService } from './acl-class.service';

@Component({
    selector: 'jhi-acl-class',
    templateUrl: './acl-class.component.html'
})
export class AclClassComponent implements OnInit, OnDestroy {
    acl_Classes: IAclClass[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acl_ClassService: AclClassService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acl_ClassService
            .query()
            .pipe(
                filter((res: HttpResponse<IAclClass[]>) => res.ok),
                map((res: HttpResponse<IAclClass[]>) => res.body)
            )
            .subscribe(
                (res: IAclClass[]) => {
                    this.acl_Classes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAcl_Classes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAclClass) {
        return item.id;
    }

    registerChangeInAcl_Classes() {
        this.eventSubscriber = this.eventManager.subscribe('acl_ClassListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
