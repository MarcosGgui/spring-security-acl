import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';
import { Acl_Object_IdentityService } from './acl-object-identity.service';

@Component({
    selector: 'jhi-acl-object-identity-delete-dialog',
    templateUrl: './acl-object-identity-delete-dialog.component.html'
})
export class Acl_Object_IdentityDeleteDialogComponent {
    acl_Object_Identity: IAcl_Object_Identity;

    constructor(
        protected acl_Object_IdentityService: Acl_Object_IdentityService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acl_Object_IdentityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acl_Object_IdentityListModification',
                content: 'Deleted an acl_Object_Identity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acl-object-identity-delete-popup',
    template: ''
})
export class Acl_Object_IdentityDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acl_Object_Identity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Acl_Object_IdentityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acl_Object_Identity = acl_Object_Identity;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/acl-object-identity', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/acl-object-identity', { outlets: { popup: null } }]);
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
