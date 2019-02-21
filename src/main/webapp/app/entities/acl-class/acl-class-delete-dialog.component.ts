import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAclClass } from 'app/shared/model/acl-class.model';
import { AclClassService } from './acl-class.service';

@Component({
    selector: 'jhi-acl-class-delete-dialog',
    templateUrl: './acl-class-delete-dialog.component.html'
})
export class AclClassDeleteDialogComponent {
    acl_Class: IAclClass;

    constructor(protected acl_ClassService: AclClassService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acl_ClassService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acl_ClassListModification',
                content: 'Deleted an acl_Class'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acl-class-delete-popup',
    template: ''
})
export class AclClassDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Class }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AclClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.acl_Class = acl_Class;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/acl-class', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/acl-class', { outlets: { popup: null } }]);
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
