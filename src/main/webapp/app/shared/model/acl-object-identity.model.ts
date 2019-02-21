import { IAcl_Class } from 'app/shared/model/acl-class.model';
import { IAcl_Sid } from 'app/shared/model/acl-sid.model';

export interface IAcl_Object_Identity {
    id?: number;
    objectIdClass?: number;
    objectIdIdentity?: string;
    parentObject?: number;
    ownerSid?: number;
    entriesInheriting?: number;
    acl_Class?: IAcl_Class;
    acl_sid?: IAcl_Sid;
}

export class Acl_Object_Identity implements IAcl_Object_Identity {
    constructor(
        public id?: number,
        public objectIdClass?: number,
        public objectIdIdentity?: string,
        public parentObject?: number,
        public ownerSid?: number,
        public entriesInheriting?: number,
        public acl_Class?: IAcl_Class,
        public acl_sid?: IAcl_Sid
    ) {}
}
