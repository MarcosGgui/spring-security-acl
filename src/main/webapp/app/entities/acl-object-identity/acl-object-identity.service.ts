import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAclObjectIdentity } from 'app/shared/model/acl-object-identity.model';

type EntityResponseType = HttpResponse<IAclObjectIdentity>;
type EntityArrayResponseType = HttpResponse<IAclObjectIdentity[]>;

@Injectable({ providedIn: 'root' })
export class AclObjectIdentityService {
    public resourceUrl = SERVER_API_URL + 'api/acl-object-identities';

    constructor(protected http: HttpClient) {}

    create(aclObjectIdentity: IAclObjectIdentity): Observable<EntityResponseType> {
        return this.http.post<IAclObjectIdentity>(this.resourceUrl, aclObjectIdentity, { observe: 'response' });
    }

    update(aclObjectIdentity: IAclObjectIdentity): Observable<EntityResponseType> {
        return this.http.put<IAclObjectIdentity>(this.resourceUrl, aclObjectIdentity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAclObjectIdentity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAclObjectIdentity[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
