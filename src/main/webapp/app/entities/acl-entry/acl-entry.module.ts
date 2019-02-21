import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import {
    AclEntryComponent,
    AclEntryDetailComponent,
    AclEntryUpdateComponent,
    AclEntryDeletePopupComponent,
    AclEntryDeleteDialogComponent,
    aclEntryRoute,
    aclEntryPopupRoute
} from './';

const ENTITY_STATES = [...aclEntryRoute, ...aclEntryPopupRoute];

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AclEntryComponent,
        AclEntryDetailComponent,
        AclEntryUpdateComponent,
        AclEntryDeleteDialogComponent,
        AclEntryDeletePopupComponent
    ],
    entryComponents: [AclEntryComponent, AclEntryUpdateComponent, AclEntryDeleteDialogComponent, AclEntryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclAclEntryModule {}
