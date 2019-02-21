/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclClassComponent } from 'app/entities/acl-class/acl-class.component';
import { AclClassService } from 'app/entities/acl-class/acl-class.service';
import { AclClass } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Component', () => {
        let comp: AclClassComponent;
        let fixture: ComponentFixture<AclClassComponent>;
        let service: AclClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclClassComponent],
                providers: []
            })
                .overrideTemplate(AclClassComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclClassService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AclClass(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.acl_Classes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
