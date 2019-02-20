/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SpringSecurityAclTestModule } from '../../../test.module';
import { NoticeMessageUpdateComponent } from 'app/entities/notice-message/notice-message-update.component';
import { NoticeMessageService } from 'app/entities/notice-message/notice-message.service';
import { NoticeMessage } from 'app/shared/model/notice-message.model';

describe('Component Tests', () => {
    describe('NoticeMessage Management Update Component', () => {
        let comp: NoticeMessageUpdateComponent;
        let fixture: ComponentFixture<NoticeMessageUpdateComponent>;
        let service: NoticeMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SpringSecurityAclTestModule],
                declarations: [NoticeMessageUpdateComponent]
            })
                .overrideTemplate(NoticeMessageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NoticeMessageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeMessageService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new NoticeMessage(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.noticeMessage = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new NoticeMessage();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.noticeMessage = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
