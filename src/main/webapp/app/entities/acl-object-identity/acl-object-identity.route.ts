import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Acl_Object_Identity } from 'app/shared/model/acl-object-identity.model';
import { Acl_Object_IdentityService } from './acl-object-identity.service';
import { Acl_Object_IdentityComponent } from './acl-object-identity.component';
import { Acl_Object_IdentityDetailComponent } from './acl-object-identity-detail.component';
import { Acl_Object_IdentityUpdateComponent } from './acl-object-identity-update.component';
import { Acl_Object_IdentityDeletePopupComponent } from './acl-object-identity-delete-dialog.component';
import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

@Injectable({ providedIn: 'root' })
export class Acl_Object_IdentityResolve implements Resolve<IAcl_Object_Identity> {
    constructor(private service: Acl_Object_IdentityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAcl_Object_Identity> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Acl_Object_Identity>) => response.ok),
                map((acl_Object_Identity: HttpResponse<Acl_Object_Identity>) => acl_Object_Identity.body)
            );
        }
        return of(new Acl_Object_Identity());
    }
}

export const acl_Object_IdentityRoute: Routes = [
    {
        path: '',
        component: Acl_Object_IdentityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: Acl_Object_IdentityDetailComponent,
        resolve: {
            acl_Object_Identity: Acl_Object_IdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: Acl_Object_IdentityUpdateComponent,
        resolve: {
            acl_Object_Identity: Acl_Object_IdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: Acl_Object_IdentityUpdateComponent,
        resolve: {
            acl_Object_Identity: Acl_Object_IdentityResolve
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
            acl_Object_Identity: Acl_Object_IdentityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Object_Identities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
