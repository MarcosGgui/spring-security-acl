import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcl_Sid } from 'app/shared/model/acl-sid.model';

type EntityResponseType = HttpResponse<IAcl_Sid>;
type EntityArrayResponseType = HttpResponse<IAcl_Sid[]>;

@Injectable({ providedIn: 'root' })
export class Acl_SidService {
    public resourceUrl = SERVER_API_URL + 'api/acl-sids';

    constructor(protected http: HttpClient) {}

    create(acl_Sid: IAcl_Sid): Observable<EntityResponseType> {
        return this.http.post<IAcl_Sid>(this.resourceUrl, acl_Sid, { observe: 'response' });
    }

    update(acl_Sid: IAcl_Sid): Observable<EntityResponseType> {
        return this.http.put<IAcl_Sid>(this.resourceUrl, acl_Sid, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcl_Sid>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcl_Sid[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
