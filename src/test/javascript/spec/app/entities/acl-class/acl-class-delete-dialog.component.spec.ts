/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclClassDeleteDialogComponent } from 'app/entities/acl-class/acl-class-delete-dialog.component';
import { AclClassService } from 'app/entities/acl-class/acl-class.service';

describe('Component Tests', () => {
    describe('AclClass Management Delete Component', () => {
        let comp: AclClassDeleteDialogComponent;
        let fixture: ComponentFixture<AclClassDeleteDialogComponent>;
        let service: AclClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclClassDeleteDialogComponent]
            })
                .overrideTemplate(AclClassDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AclClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclClassService);
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
