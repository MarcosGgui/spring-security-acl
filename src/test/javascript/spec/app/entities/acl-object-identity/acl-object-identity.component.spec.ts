/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_Object_IdentityComponent } from 'app/entities/acl-object-identity/acl-object-identity.component';
import { Acl_Object_IdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';
import { Acl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Component', () => {
        let comp: Acl_Object_IdentityComponent;
        let fixture: ComponentFixture<Acl_Object_IdentityComponent>;
        let service: Acl_Object_IdentityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_Object_IdentityComponent],
                providers: []
            })
                .overrideTemplate(Acl_Object_IdentityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acl_Object_IdentityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_Object_IdentityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Acl_Object_Identity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.acl_Object_Identities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
