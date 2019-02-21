/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclObjectIdentityComponent } from 'app/entities/acl-object-identity/acl-object-identity.component';
import { AclObjectIdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';
import { AclObjectIdentity } from 'app/shared/model/acl-object-identity.model';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Component', () => {
        let comp: AclObjectIdentityComponent;
        let fixture: ComponentFixture<AclObjectIdentityComponent>;
        let service: AclObjectIdentityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclObjectIdentityComponent],
                providers: []
            })
                .overrideTemplate(AclObjectIdentityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclObjectIdentityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclObjectIdentityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AclObjectIdentity(123)],
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
