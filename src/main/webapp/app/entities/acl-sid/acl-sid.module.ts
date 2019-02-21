import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    Acl_SidComponent,
    Acl_SidDetailComponent,
    Acl_SidUpdateComponent,
    Acl_SidDeletePopupComponent,
    Acl_SidDeleteDialogComponent,
    acl_SidRoute,
    acl_SidPopupRoute
} from './';

const ENTITY_STATES = [...acl_SidRoute, ...acl_SidPopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Acl_SidComponent,
        Acl_SidDetailComponent,
        Acl_SidUpdateComponent,
        Acl_SidDeleteDialogComponent,
        Acl_SidDeletePopupComponent
    ],
    entryComponents: [Acl_SidComponent, Acl_SidUpdateComponent, Acl_SidDeleteDialogComponent, Acl_SidDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclAcl_SidModule {}
