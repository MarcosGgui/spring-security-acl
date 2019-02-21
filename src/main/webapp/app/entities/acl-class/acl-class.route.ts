import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AclClass } from 'app/shared/model/acl-class.model';
import { AclClassService } from './acl-class.service';
import { AclClassComponent } from './acl-class.component';
import { AclClassDetailComponent } from './acl-class-detail.component';
import { AclClassUpdateComponent } from './acl-class-update.component';
import { AclClassDeletePopupComponent } from './acl-class-delete-dialog.component';
import { IAclClass } from 'app/shared/model/acl-class.model';

@Injectable({ providedIn: 'root' })
export class AclClassResolve implements Resolve<IAclClass> {
    constructor(private service: AclClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAclClass> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AclClass>) => response.ok),
                map((aclClass: HttpResponse<AclClass>) => aclClass.body)
            );
        }
        return of(new AclClass());
    }
}

export const aclClassRoute: Routes = [
    {
        path: '',
        component: AclClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AclClassDetailComponent,
        resolve: {
            acl_Class: AclClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AclClassUpdateComponent,
        resolve: {
            acl_Class: AclClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AclClassUpdateComponent,
        resolve: {
            acl_Class: AclClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acl_ClassPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AclClassDeletePopupComponent,
        resolve: {
            acl_Class: AclClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
