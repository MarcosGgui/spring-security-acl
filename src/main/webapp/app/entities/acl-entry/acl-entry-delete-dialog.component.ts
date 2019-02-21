import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAclEntry } from 'app/shared/model/acl-entry.model';
import { AclEntryService } from './acl-entry.service';

@Component({
    selector: 'jhi-acl-entry-delete-dialog',
    templateUrl: './acl-entry-delete-dialog.component.html'
})
export class AclEntryDeleteDialogComponent {
    aclEntry: IAclEntry;

    constructor(protected aclEntryService: AclEntryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aclEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'aclEntryListModification',
                content: 'Deleted an aclEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acl-entry-delete-popup',
    template: ''
})
export class AclEntryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aclEntry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AclEntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.aclEntry = aclEntry;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/acl-entry', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/acl-entry', { outlets: { popup: null } }]);
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
