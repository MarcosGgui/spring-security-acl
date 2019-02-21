import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcl_Class } from 'app/shared/model/acl-class.model';
import { Acl_ClassService } from './acl-class.service';

@Component({
    selector: 'jhi-acl-class-delete-dialog',
    templateUrl: './acl-class-delete-dialog.component.html'
})
export class Acl_ClassDeleteDialogComponent {
    acl_Class: IAcl_Class;

    constructor(
        protected acl_ClassService: Acl_ClassService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

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
export class Acl_ClassDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Class }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Acl_ClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
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
