/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { NoticeMessageDetailComponent } from 'app/entities/notice-message/notice-message-detail.component';
import { NoticeMessage } from 'app/shared/model/notice-message.model';

describe('Component Tests', () => {
    describe('NoticeMessage Management Detail Component', () => {
        let comp: NoticeMessageDetailComponent;
        let fixture: ComponentFixture<NoticeMessageDetailComponent>;
        const route = ({ data: of({ noticeMessage: new NoticeMessage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [NoticeMessageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NoticeMessageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NoticeMessageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.noticeMessage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
