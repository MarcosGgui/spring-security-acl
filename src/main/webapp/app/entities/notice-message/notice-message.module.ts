import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    NoticeMessageComponent,
    NoticeMessageDetailComponent,
    NoticeMessageUpdateComponent,
    NoticeMessageDeletePopupComponent,
    NoticeMessageDeleteDialogComponent,
    noticeMessageRoute,
    noticeMessagePopupRoute
} from './';

const ENTITY_STATES = [...noticeMessageRoute, ...noticeMessagePopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NoticeMessageComponent,
        NoticeMessageDetailComponent,
        NoticeMessageUpdateComponent,
        NoticeMessageDeleteDialogComponent,
        NoticeMessageDeletePopupComponent
    ],
    entryComponents: [
        NoticeMessageComponent,
        NoticeMessageUpdateComponent,
        NoticeMessageDeleteDialogComponent,
        NoticeMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclNoticeMessageModule {}
