import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

type EntityResponseType = HttpResponse<IAcl_Object_Identity>;
type EntityArrayResponseType = HttpResponse<IAcl_Object_Identity[]>;

@Injectable({ providedIn: 'root' })
export class Acl_Object_IdentityService {
    public resourceUrl = SERVER_API_URL + 'api/acl-object-identities';

    constructor(protected http: HttpClient) {}

    create(acl_Object_Identity: IAcl_Object_Identity): Observable<EntityResponseType> {
        return this.http.post<IAcl_Object_Identity>(this.resourceUrl, acl_Object_Identity, { observe: 'response' });
    }

    update(acl_Object_Identity: IAcl_Object_Identity): Observable<EntityResponseType> {
        return this.http.put<IAcl_Object_Identity>(this.resourceUrl, acl_Object_Identity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcl_Object_Identity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcl_Object_Identity[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
