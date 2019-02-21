import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AclEntry } from 'app/shared/model/acl-entry.model';
import { AclEntryService } from './acl-entry.service';
import { AclEntryComponent } from './acl-entry.component';
import { AclEntryDetailComponent } from './acl-entry-detail.component';
import { AclEntryUpdateComponent } from './acl-entry-update.component';
import { AclEntryDeletePopupComponent } from './acl-entry-delete-dialog.component';
import { IAclEntry } from 'app/shared/model/acl-entry.model';

@Injectable({ providedIn: 'root' })
export class AclEntryResolve implements Resolve<IAclEntry> {
    constructor(private service: AclEntryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAclEntry> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AclEntry>) => response.ok),
                map((aclEntry: HttpResponse<AclEntry>) => aclEntry.body)
            );
        }
        return of(new AclEntry());
    }
}

export const aclEntryRoute: Routes = [
    {
        path: '',
        component: AclEntryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AclEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AclEntryDetailComponent,
        resolve: {
            aclEntry: AclEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AclEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AclEntryUpdateComponent,
        resolve: {
            aclEntry: AclEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AclEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AclEntryUpdateComponent,
        resolve: {
            aclEntry: AclEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AclEntries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aclEntryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AclEntryDeletePopupComponent,
        resolve: {
            aclEntry: AclEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AclEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
