import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { INoticeMessage } from 'app/shared/model/notice-message.model';
import { NoticeMessageService } from './notice-message.service';

@Component({
    selector: 'jhi-notice-message-update',
    templateUrl: './notice-message-update.component.html'
})
export class NoticeMessageUpdateComponent implements OnInit {
    noticeMessage: INoticeMessage;
    isSaving: boolean;

    constructor(protected noticeMessageService: NoticeMessageService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ noticeMessage }) => {
            this.noticeMessage = noticeMessage;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.noticeMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.noticeMessageService.update(this.noticeMessage));
        } else {
            this.subscribeToSaveResponse(this.noticeMessageService.create(this.noticeMessage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INoticeMessage>>) {
        result.subscribe((res: HttpResponse<INoticeMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
