import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    AclClassComponent,
    AclClassDetailComponent,
    AclClassUpdateComponent,
    AclClassDeletePopupComponent,
    AclClassDeleteDialogComponent,
    aclClassRoute,
    acl_ClassPopupRoute
} from './';

const ENTITY_STATES = [...aclClassRoute, ...acl_ClassPopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AclClassComponent,
        AclClassDetailComponent,
        AclClassUpdateComponent,
        AclClassDeleteDialogComponent,
        AclClassDeletePopupComponent
    ],
    entryComponents: [AclClassComponent, AclClassUpdateComponent, AclClassDeleteDialogComponent, AclClassDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclAcl_ClassModule {}
