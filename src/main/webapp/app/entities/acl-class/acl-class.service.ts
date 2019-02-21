import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcl_Class } from 'app/shared/model/acl-class.model';

type EntityResponseType = HttpResponse<IAcl_Class>;
type EntityArrayResponseType = HttpResponse<IAcl_Class[]>;

@Injectable({ providedIn: 'root' })
export class Acl_ClassService {
    public resourceUrl = SERVER_API_URL + 'api/acl-classes';

    constructor(protected http: HttpClient) {}

    create(acl_Class: IAcl_Class): Observable<EntityResponseType> {
        return this.http.post<IAcl_Class>(this.resourceUrl, acl_Class, { observe: 'response' });
    }

    update(acl_Class: IAcl_Class): Observable<EntityResponseType> {
        return this.http.put<IAcl_Class>(this.resourceUrl, acl_Class, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcl_Class>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcl_Class[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
