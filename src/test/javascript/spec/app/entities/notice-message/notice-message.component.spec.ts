/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { NoticeMessageComponent } from 'app/entities/notice-message/notice-message.component';
import { NoticeMessageService } from 'app/entities/notice-message/notice-message.service';
import { NoticeMessage } from 'app/shared/model/notice-message.model';

describe('Component Tests', () => {
    describe('NoticeMessage Management Component', () => {
        let comp: NoticeMessageComponent;
        let fixture: ComponentFixture<NoticeMessageComponent>;
        let service: NoticeMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [NoticeMessageComponent],
                providers: []
            })
                .overrideTemplate(NoticeMessageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NoticeMessageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeMessageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NoticeMessage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.noticeMessages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
