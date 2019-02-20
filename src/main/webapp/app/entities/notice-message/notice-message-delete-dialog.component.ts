import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INoticeMessage } from 'app/shared/model/notice-message.model';
import { NoticeMessageService } from './notice-message.service';

@Component({
    selector: 'jhi-notice-message-delete-dialog',
    templateUrl: './notice-message-delete-dialog.component.html'
})
export class NoticeMessageDeleteDialogComponent {
    noticeMessage: INoticeMessage;

    constructor(
        protected noticeMessageService: NoticeMessageService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.noticeMessageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'noticeMessageListModification',
                content: 'Deleted an noticeMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notice-message-delete-popup',
    template: ''
})
export class NoticeMessageDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ noticeMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NoticeMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.noticeMessage = noticeMessage;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/notice-message', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/notice-message', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
