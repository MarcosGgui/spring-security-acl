/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_Object_IdentityUpdateComponent } from 'app/entities/acl-object-identity/acl-object-identity-update.component';
import { Acl_Object_IdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';
import { Acl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Update Component', () => {
        let comp: Acl_Object_IdentityUpdateComponent;
        let fixture: ComponentFixture<Acl_Object_IdentityUpdateComponent>;
        let service: Acl_Object_IdentityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_Object_IdentityUpdateComponent]
            })
                .overrideTemplate(Acl_Object_IdentityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acl_Object_IdentityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_Object_IdentityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acl_Object_Identity(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acl_Object_Identity = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acl_Object_Identity();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acl_Object_Identity = entity;
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
