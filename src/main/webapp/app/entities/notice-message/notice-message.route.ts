import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NoticeMessage } from 'app/shared/model/notice-message.model';
import { NoticeMessageService } from './notice-message.service';
import { NoticeMessageComponent } from './notice-message.component';
import { NoticeMessageDetailComponent } from './notice-message-detail.component';
import { NoticeMessageUpdateComponent } from './notice-message-update.component';
import { NoticeMessageDeletePopupComponent } from './notice-message-delete-dialog.component';
import { INoticeMessage } from 'app/shared/model/notice-message.model';

@Injectable({ providedIn: 'root' })
export class NoticeMessageResolve implements Resolve<INoticeMessage> {
    constructor(private service: NoticeMessageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INoticeMessage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NoticeMessage>) => response.ok),
                map((noticeMessage: HttpResponse<NoticeMessage>) => noticeMessage.body)
            );
        }
        return of(new NoticeMessage());
    }
}

export const noticeMessageRoute: Routes = [
    {
        path: '',
        component: NoticeMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoticeMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: NoticeMessageDetailComponent,
        resolve: {
            noticeMessage: NoticeMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoticeMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: NoticeMessageUpdateComponent,
        resolve: {
            noticeMessage: NoticeMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoticeMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: NoticeMessageUpdateComponent,
        resolve: {
            noticeMessage: NoticeMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoticeMessages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const noticeMessagePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: NoticeMessageDeletePopupComponent,
        resolve: {
            noticeMessage: NoticeMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoticeMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
