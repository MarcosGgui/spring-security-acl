/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_ClassUpdateComponent } from 'app/entities/acl-class/acl-class-update.component';
import { Acl_ClassService } from 'app/entities/acl-class/acl-class.service';
import { Acl_Class } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Update Component', () => {
        let comp: Acl_ClassUpdateComponent;
        let fixture: ComponentFixture<Acl_ClassUpdateComponent>;
        let service: Acl_ClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_ClassUpdateComponent]
            })
                .overrideTemplate(Acl_ClassUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acl_ClassUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_ClassService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acl_Class(123);
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
                const entity = new Acl_Class();
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
