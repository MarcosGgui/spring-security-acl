import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Acl_Class } from 'app/shared/model/acl-class.model';
import { Acl_ClassService } from './acl-class.service';
import { Acl_ClassComponent } from './acl-class.component';
import { Acl_ClassDetailComponent } from './acl-class-detail.component';
import { Acl_ClassUpdateComponent } from './acl-class-update.component';
import { Acl_ClassDeletePopupComponent } from './acl-class-delete-dialog.component';
import { IAcl_Class } from 'app/shared/model/acl-class.model';

@Injectable({ providedIn: 'root' })
export class Acl_ClassResolve implements Resolve<IAcl_Class> {
    constructor(private service: Acl_ClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAcl_Class> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Acl_Class>) => response.ok),
                map((acl_Class: HttpResponse<Acl_Class>) => acl_Class.body)
            );
        }
        return of(new Acl_Class());
    }
}

export const acl_ClassRoute: Routes = [
    {
        path: '',
        component: Acl_ClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: Acl_ClassDetailComponent,
        resolve: {
            acl_Class: Acl_ClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: Acl_ClassUpdateComponent,
        resolve: {
            acl_Class: Acl_ClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: Acl_ClassUpdateComponent,
        resolve: {
            acl_Class: Acl_ClassResolve
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
        component: Acl_ClassDeletePopupComponent,
        resolve: {
            acl_Class: Acl_ClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acl_Classes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
