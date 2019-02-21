import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    Acl_Object_IdentityComponent,
    Acl_Object_IdentityDetailComponent,
    Acl_Object_IdentityUpdateComponent,
    Acl_Object_IdentityDeletePopupComponent,
    Acl_Object_IdentityDeleteDialogComponent,
    acl_Object_IdentityRoute,
    acl_Object_IdentityPopupRoute
} from './';

const ENTITY_STATES = [...acl_Object_IdentityRoute, ...acl_Object_IdentityPopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Acl_Object_IdentityComponent,
        Acl_Object_IdentityDetailComponent,
        Acl_Object_IdentityUpdateComponent,
        Acl_Object_IdentityDeleteDialogComponent,
        Acl_Object_IdentityDeletePopupComponent
    ],
    entryComponents: [
        Acl_Object_IdentityComponent,
        Acl_Object_IdentityUpdateComponent,
        Acl_Object_IdentityDeleteDialogComponent,
        Acl_Object_IdentityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclAcl_Object_IdentityModule {}
