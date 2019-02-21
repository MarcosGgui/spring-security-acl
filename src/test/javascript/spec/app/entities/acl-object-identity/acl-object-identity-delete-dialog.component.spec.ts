/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_Object_IdentityDeleteDialogComponent } from 'app/entities/acl-object-identity/acl-object-identity-delete-dialog.component';
import { AclObjectIdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Delete Component', () => {
        let comp: Acl_Object_IdentityDeleteDialogComponent;
        let fixture: ComponentFixture<Acl_Object_IdentityDeleteDialogComponent>;
        let service: AclObjectIdentityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_Object_IdentityDeleteDialogComponent]
            })
                .overrideTemplate(Acl_Object_IdentityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acl_Object_IdentityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclObjectIdentityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
