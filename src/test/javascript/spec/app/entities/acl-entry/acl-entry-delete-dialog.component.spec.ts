/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclEntryDeleteDialogComponent } from 'app/entities/acl-entry/acl-entry-delete-dialog.component';
import { AclEntryService } from 'app/entities/acl-entry/acl-entry.service';

describe('Component Tests', () => {
    describe('AclEntry Management Delete Component', () => {
        let comp: AclEntryDeleteDialogComponent;
        let fixture: ComponentFixture<AclEntryDeleteDialogComponent>;
        let service: AclEntryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclEntryDeleteDialogComponent]
            })
                .overrideTemplate(AclEntryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AclEntryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclEntryService);
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
