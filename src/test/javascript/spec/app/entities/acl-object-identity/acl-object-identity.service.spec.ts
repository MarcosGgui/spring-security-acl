/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Acl_Object_IdentityService } from 'app/entities/acl-object-identity/acl-object-identity.service';
import { IAcl_Object_Identity, Acl_Object_Identity } from 'app/shared/model/acl-object-identity.model';

describe('Service Tests', () => {
    describe('AclObjectIdentity Service', () => {
        let injector: TestBed;
        let service: Acl_Object_IdentityService;
        let httpMock: HttpTestingController;
        let elemDefault: IAcl_Object_Identity;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(Acl_Object_IdentityService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Acl_Object_Identity(0, 0, 'AAAAAAA', 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AclObjectIdentity', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Acl_Object_Identity(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AclObjectIdentity', async () => {
                const returnedFromService = Object.assign(
                    {
                        objectIdClass: 1,
                        objectIdIdentity: 'BBBBBB',
                        parentObject: 1,
                        ownerSid: 1,
                        entriesInheriting: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AclObjectIdentity', async () => {
                const returnedFromService = Object.assign(
                    {
                        objectIdClass: 1,
                        objectIdIdentity: 'BBBBBB',
                        parentObject: 1,
                        ownerSid: 1,
                        entriesInheriting: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AclObjectIdentity', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
