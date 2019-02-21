/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclEntryUpdateComponent } from 'app/entities/acl-entry/acl-entry-update.component';
import { AclEntryService } from 'app/entities/acl-entry/acl-entry.service';
import { AclEntry } from 'app/shared/model/acl-entry.model';

describe('Component Tests', () => {
    describe('AclEntry Management Update Component', () => {
        let comp: AclEntryUpdateComponent;
        let fixture: ComponentFixture<AclEntryUpdateComponent>;
        let service: AclEntryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclEntryUpdateComponent]
            })
                .overrideTemplate(AclEntryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclEntryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclEntryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AclEntry(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.aclEntry = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AclEntry();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.aclEntry = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
