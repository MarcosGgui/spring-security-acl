import { NgModule } from '@angular/core';

import { SpringSecurityAclSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SpringSecurityAclSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SpringSecurityAclSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SpringSecurityAclSharedCommonModule {}
