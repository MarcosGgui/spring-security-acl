import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAclEntry } from 'app/shared/model/acl-entry.model';

type EntityResponseType = HttpResponse<IAclEntry>;
type EntityArrayResponseType = HttpResponse<IAclEntry[]>;

@Injectable({ providedIn: 'root' })
export class AclEntryService {
    public resourceUrl = SERVER_API_URL + 'api/acl-entries';

    constructor(protected http: HttpClient) {}

    create(aclEntry: IAclEntry): Observable<EntityResponseType> {
        return this.http.post<IAclEntry>(this.resourceUrl, aclEntry, { observe: 'response' });
    }

    update(aclEntry: IAclEntry): Observable<EntityResponseType> {
        return this.http.put<IAclEntry>(this.resourceUrl, aclEntry, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAclEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAclEntry[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
