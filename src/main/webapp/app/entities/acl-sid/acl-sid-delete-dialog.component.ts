import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcl_Sid } from 'app/shared/model/acl-sid.model';
import { Acl_SidService } from './acl-sid.service';

@Component({
    selector: 'jhi-acl-sid-delete-dialog',
    templateUrl: './acl-sid-delete-dialog.component.html'
})
export class Acl_SidDeleteDialogComponent {
    acl_Sid: IAcl_Sid;

    constructor(protected acl_SidService: Acl_SidService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acl_SidService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acl_SidListModification',
                content: 'Deleted an acl_Sid'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acl-sid-delete-popup',
    template: ''
})
export class Acl_SidDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Sid }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Acl_SidDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.acl_Sid = acl_Sid;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/acl-sid', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/acl-sid', { outlets: { popup: null } }]);
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
