import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    Acl_ClassComponent,
    Acl_ClassDetailComponent,
    Acl_ClassUpdateComponent,
    Acl_ClassDeletePopupComponent,
    Acl_ClassDeleteDialogComponent,
    acl_ClassRoute,
    acl_ClassPopupRoute
} from './';

const ENTITY_STATES = [...acl_ClassRoute, ...acl_ClassPopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Acl_ClassComponent,
        Acl_ClassDetailComponent,
        Acl_ClassUpdateComponent,
        Acl_ClassDeleteDialogComponent,
        Acl_ClassDeletePopupComponent
    ],
    entryComponents: [Acl_ClassComponent, Acl_ClassUpdateComponent, Acl_ClassDeleteDialogComponent, Acl_ClassDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclAcl_ClassModule {}
