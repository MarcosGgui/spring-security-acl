import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AclObjectIdentity } from 'app/shared/model/acl-object-identity.model';
import { AclObjectIdentityService } from './acl-object-identity.service';
import { AclObjectIdentityComponent } from './acl-object-identity.component';
import { AclObjectIdentityDetailComponent } from './acl-object-identity-detail.component';
import { AclObjectIdentityUpdateComponent } from './acl-object-identity-update.component';
import { Acl_Object_IdentityDeletePopupComponent } from './acl-object-identity-delete-dialog.component';
import { IAclObjectIdentity } from 'app/shared/model/acl-object-identity.model';

@Injectable({ providedIn: 'root' })
export class AclObjectIdentityResolve implements Resolve<IAclObjectIdentity> {
    constructor(private service: AclObjectIdentityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAclObjectIdentity> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AclObjectIdentity>) => response.ok),
                map((acl_Object_Identity: HttpResponse<AclObjectIdentity>) => acl_Object_Identity.body)
            );
        }
        return of(new AclObjectIdentity());
    }
}

export const acl_Object_IdentityRoute: Routes = [
    {
        path: '',
        component: AclObjectIdentityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AclObjectIdentityDetailComponent,
        resolve: {
            acl_Object_Identity: AclObjectIdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AclObjectIdentityUpdateComponent,
        resolve: {
            acl_Object_Identity: AclObjectIdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AclObjectIdentityUpdateComponent,
        resolve: {
            acl_Object_Identity: AclObjectIdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acl_Object_IdentityPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: Acl_Object_IdentityDeletePopupComponent,
        resolve: {
            acl_Object_Identity: AclObjectIdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
