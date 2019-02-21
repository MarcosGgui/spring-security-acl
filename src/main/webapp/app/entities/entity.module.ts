import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'notice-message',
                loadChildren: './notice-message/notice-message.module#SpringSecurityAclNoticeMessageModule'
            },
            {
                path: 'acl-class',
                loadChildren: './acl-class/acl-class.module#SpringSecurityAclAcl_ClassModule'
            },
            {
                path: 'acl-sid',
                loadChildren: './acl-sid/acl-sid.module#SpringSecurityAclAcl_SidModule'
            },
            {
                path: 'acl-object-identity',
                loadChildren: './acl-object-identity/acl-object-identity.module#SpringSecurityAclAcl_Object_IdentityModule'
            },
            {
                path: 'acl-entry',
                loadChildren: './acl-entry/acl-entry.module#SpringSecurityAclAclEntryModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringSecurityAclEntityModule {}
