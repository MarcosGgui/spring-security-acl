import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAclSid } from 'app/shared/model/acl-sid.model';

type EntityResponseType = HttpResponse<IAclSid>;
type EntityArrayResponseType = HttpResponse<IAclSid[]>;

@Injectable({ providedIn: 'root' })
export class AclSidService {
    public resourceUrl = SERVER_API_URL + 'api/acl-sids';

    constructor(protected http: HttpClient) {}

    create(acl_Sid: IAclSid): Observable<EntityResponseType> {
        return this.http.post<IAclSid>(this.resourceUrl, acl_Sid, { observe: 'response' });
    }

    update(acl_Sid: IAclSid): Observable<EntityResponseType> {
        return this.http.put<IAclSid>(this.resourceUrl, acl_Sid, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAclSid>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAclSid[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
