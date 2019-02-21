import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringSecurityAclSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { AccessControlModule } from 'app/home/access-control/access-control.module';

@NgModule({
    imports: [SpringSecurityAclSharedModule, RouterModule.forChild([HOME_ROUTE]), AccessControlModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclHomeModule {}
