/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclObjectIdentityUpdateComponent } from 'app/entities/acl-object-identity/acl-object-identity-update.component';
import { AclObjectIdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';
import { AclObjectIdentity } from 'app/shared/model/acl-object-identity.model';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Update Component', () => {
        let comp: AclObjectIdentityUpdateComponent;
        let fixture: ComponentFixture<AclObjectIdentityUpdateComponent>;
        let service: AclObjectIdentityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclObjectIdentityUpdateComponent]
            })
                .overrideTemplate(AclObjectIdentityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclObjectIdentityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclObjectIdentityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AclObjectIdentity(123);
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
                const entity = new AclObjectIdentity();
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
