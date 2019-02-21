/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclEntryDetailComponent } from 'app/entities/acl-entry/acl-entry-detail.component';
import { AclEntry } from 'app/shared/model/acl-entry.model';

describe('Component Tests', () => {
    describe('AclEntry Management Detail Component', () => {
        let comp: AclEntryDetailComponent;
        let fixture: ComponentFixture<AclEntryDetailComponent>;
        const route = ({ data: of({ aclEntry: new AclEntry(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclEntryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AclEntryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AclEntryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.aclEntry).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
