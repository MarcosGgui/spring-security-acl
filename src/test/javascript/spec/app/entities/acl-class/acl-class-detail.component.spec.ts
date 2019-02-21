/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclClassDetailComponent } from 'app/entities/acl-class/acl-class-detail.component';
import { AclClass } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Detail Component', () => {
        let comp: AclClassDetailComponent;
        let fixture: ComponentFixture<AclClassDetailComponent>;
        const route = ({ data: of({ acl_Class: new AclClass(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclClassDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AclClassDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AclClassDetailComponent);
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
