/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclClassUpdateComponent } from 'app/entities/acl-class/acl-class-update.component';
import { AclClassService } from 'app/entities/acl-class/acl-class.service';
import { AclClass } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Update Component', () => {
        let comp: AclClassUpdateComponent;
        let fixture: ComponentFixture<AclClassUpdateComponent>;
        let service: AclClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclClassUpdateComponent]
            })
                .overrideTemplate(AclClassUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclClassUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclClassService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AclClass(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acl_Class = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AclClass();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acl_Class = entity;
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
