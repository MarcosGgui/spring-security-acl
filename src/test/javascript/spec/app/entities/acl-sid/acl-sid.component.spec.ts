/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_SidComponent } from 'app/entities/acl-sid/acl-sid.component';
import { Acl_SidService } from 'app/entities/acl-sid/acl-sid.service';
import { Acl_Sid } from 'app/shared/model/acl-sid.model';

describe('Component Tests', () => {
    describe('AclSid Management Component', () => {
        let comp: Acl_SidComponent;
        let fixture: ComponentFixture<Acl_SidComponent>;
        let service: Acl_SidService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_SidComponent],
                providers: []
            })
                .overrideTemplate(Acl_SidComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acl_SidComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_SidService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Acl_Sid(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.acl_Sids[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
