/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { AclEntryComponent } from 'app/entities/acl-entry/acl-entry.component';
import { AclEntryService } from 'app/entities/acl-entry/acl-entry.service';
import { AclEntry } from 'app/shared/model/acl-entry.model';

describe('Component Tests', () => {
    describe('AclEntry Management Component', () => {
        let comp: AclEntryComponent;
        let fixture: ComponentFixture<AclEntryComponent>;
        let service: AclEntryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [AclEntryComponent],
                providers: []
            })
                .overrideTemplate(AclEntryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AclEntryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AclEntryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AclEntry(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.aclEntries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
