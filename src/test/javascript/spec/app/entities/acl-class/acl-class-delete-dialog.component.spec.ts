/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_ClassDeleteDialogComponent } from 'app/entities/acl-class/acl-class-delete-dialog.component';
import { Acl_ClassService } from 'app/entities/acl-class/acl-class.service';

describe('Component Tests', () => {
    describe('AclClass Management Delete Component', () => {
        let comp: Acl_ClassDeleteDialogComponent;
        let fixture: ComponentFixture<Acl_ClassDeleteDialogComponent>;
        let service: Acl_ClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_ClassDeleteDialogComponent]
            })
                .overrideTemplate(Acl_ClassDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acl_ClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_ClassService);
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
