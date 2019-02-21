/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { Acl_ClassComponent } from 'app/entities/acl-class/acl-class.component';
import { Acl_ClassService } from 'app/entities/acl-class/acl-class.service';
import { Acl_Class } from 'app/shared/model/acl-class.model';

describe('Component Tests', () => {
    describe('AclClass Management Component', () => {
        let comp: Acl_ClassComponent;
        let fixture: ComponentFixture<Acl_ClassComponent>;
        let service: Acl_ClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [Acl_ClassComponent],
                providers: []
            })
                .overrideTemplate(Acl_ClassComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acl_ClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acl_ClassService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Acl_Class(123)],
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
