import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INoticeMessage } from 'app/shared/model/notice-message.model';

@Component({
    selector: 'jhi-notice-message-detail',
    templateUrl: './notice-message-detail.component.html'
})
export class NoticeMessageDetailComponent implements OnInit {
    noticeMessage: INoticeMessage;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ noticeMessage }) => {
            this.noticeMessage = noticeMessage;
        });
    }

    previousState() {
        window.history.back();
    }
}
