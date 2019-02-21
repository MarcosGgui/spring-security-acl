import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAclClass } from 'app/shared/model/acl-class.model';

type EntityResponseType = HttpResponse<IAclClass>;
type EntityArrayResponseType = HttpResponse<IAclClass[]>;

@Injectable({ providedIn: 'root' })
export class AclClassService {
    public resourceUrl = SERVER_API_URL + 'api/acl-classes';

    constructor(protected http: HttpClient) {}

    create(acl_Class: IAclClass): Observable<EntityResponseType> {
        return this.http.post<IAclClass>(this.resourceUrl, acl_Class, { observe: 'response' });
    }

    update(acl_Class: IAclClass): Observable<EntityResponseType> {
        return this.http.put<IAclClass>(this.resourceUrl, acl_Class, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAclClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAclClass[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
