import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AclSid } from 'app/shared/model/acl-sid.model';
import { AclSidService } from './acl-sid.service';
import { Acl_SidComponent } from './acl-sid.component';
import { Acl_SidDetailComponent } from './acl-sid-detail.component';
import { Acl_SidUpdateComponent } from './acl-sid-update.component';
import { Acl_SidDeletePopupComponent } from './acl-sid-delete-dialog.component';
import { IAclSid } from 'app/shared/model/acl-sid.model';

@Injectable({ providedIn: 'root' })
export class Acl_SidResolve implements Resolve<IAclSid> {
    constructor(private service: AclSidService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAclSid> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AclSid>) => response.ok),
                map((acl_Sid: HttpResponse<AclSid>) => acl_Sid.body)
            );
        }
        return of(new AclSid());
    }
}

export const acl_SidRoute: Routes = [
    {
        path: '',
        component: Acl_SidComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Sids'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: Acl_SidDetailComponent,
        resolve: {
            acl_Sid: Acl_SidResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Sids'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: Acl_SidUpdateComponent,
        resolve: {
            acl_Sid: Acl_SidResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Sids'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: Acl_SidUpdateComponent,
        resolve: {
            acl_Sid: Acl_SidResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Sids'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acl_SidPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: Acl_SidDeletePopupComponent,
        resolve: {
            acl_Sid: Acl_SidResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Sids'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
