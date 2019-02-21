/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_ClassDetailComponent } from 'app/entities/acl-class/acl-class-detail.component';
import { Acl_Class } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Detail Component', () => {
        let comp: Acl_ClassDetailComponent;
        let fixture: ComponentFixture<Acl_ClassDetailComponent>;
        const route = ({ data: of({ acl_Class: new Acl_Class(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_ClassDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Acl_ClassDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acl_ClassDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acl_Class).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
