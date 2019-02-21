/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_SidDetailComponent } from 'app/entities/acl-sid/acl-sid-detail.component';
import { AclSid } from 'app/shared/model/acl-sid.model';

describe('Component Tests', () => {
    describe('AclSid Management Detail Component', () => {
        let comp: Acl_SidDetailComponent;
        let fixture: ComponentFixture<Acl_SidDetailComponent>;
        const route = ({ data: of({ acl_Sid: new AclSid(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_SidDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Acl_SidDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acl_SidDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acl_Sid).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
