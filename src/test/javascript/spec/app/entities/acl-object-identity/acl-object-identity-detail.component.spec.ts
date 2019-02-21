/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_Object_IdentityDetailComponent } from 'app/entities/acl-object-identity/acl-object-identity-detail.component';
import { Acl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

describe('Component Tests', () => {
    describe('AclObjectIdentity Management Detail Component', () => {
        let comp: Acl_Object_IdentityDetailComponent;
        let fixture: ComponentFixture<Acl_Object_IdentityDetailComponent>;
        const route = ({ data: of({ acl_Object_Identity: new Acl_Object_Identity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_Object_IdentityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Acl_Object_IdentityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acl_Object_IdentityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acl_Object_Identity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
