import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INoticeMessage } from 'app/shared/model/notice-message.model';
import { AccountService } from 'app/core';
import { NoticeMessageService } from './notice-message.service';

@Component({
    selector: 'jhi-notice-message',
    templateUrl: './notice-message.component.html'
})
export class NoticeMessageComponent implements OnInit, OnDestroy {
    noticeMessages: INoticeMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected noticeMessageService: NoticeMessageService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.noticeMessageService
            .query()
            .pipe(
                filter((res: HttpResponse<INoticeMessage[]>) => res.ok),
                map((res: HttpResponse<INoticeMessage[]>) => res.body)
            )
            .subscribe(
                (res: INoticeMessage[]) => {
                    this.noticeMessages = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNoticeMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INoticeMessage) {
        return item.id;
    }

    registerChangeInNoticeMessages() {
        this.eventSubscriber = this.eventManager.subscribe('noticeMessageListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
