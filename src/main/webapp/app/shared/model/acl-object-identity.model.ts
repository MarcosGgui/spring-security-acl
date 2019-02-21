import { IAclClass } from 'app/shared/model/acl-class.model';
import { IAclSid } from 'app/shared/model/acl-sid.model';

export interface IAclObjectIdentity {
    id?: number;
    objectIdClass?: number;
    objectIdIdentity?: string;
    parentObject?: number;
    ownerSid?: number;
    entriesInheriting?: number;
    acl_Class?: IAclClass;
    acl_sid?: IAclSid;
}

export class AclObjectIdentity implements IAclObjectIdentity {
    constructor(
        public id?: number,
        public objectIdClass?: number,
        public objectIdIdentity?: string,
        public parentObject?: number,
        public ownerSid?: number,
        public entriesInheriting?: number,
        public acl_Class?: IAclClass,
        public acl_sid?: IAclSid
    ) {}
}
