import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INoticeMessage } from 'app/shared/model/notice-message.model';

type EntityResponseType = HttpResponse<INoticeMessage>;
type EntityArrayResponseType = HttpResponse<INoticeMessage[]>;

@Injectable({ providedIn: 'root' })
export class NoticeMessageService {
    public resourceUrl = SERVER_API_URL + 'api/notice-messages';

    constructor(protected http: HttpClient) {}

    create(noticeMessage: INoticeMessage): Observable<EntityResponseType> {
        return this.http.post<INoticeMessage>(this.resourceUrl, noticeMessage, { observe: 'response' });
    }

    update(noticeMessage: INoticeMessage): Observable<EntityResponseType> {
        return this.http.put<INoticeMessage>(this.resourceUrl, noticeMessage, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INoticeMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INoticeMessage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
