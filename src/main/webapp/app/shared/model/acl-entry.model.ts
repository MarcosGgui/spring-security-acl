export interface IAclEntry {
    id?: number;
    aclObjectIdentity?: number;
    aceOrder?: number;
    sid?: number;
    mask?: number;
    granting?: number;
    auditSuccess?: number;
    auditFailure?: number;
}

export class AclEntry implements IAclEntry {
    constructor(
        public id?: number,
        public aclObjectIdentity?: number,
        public aceOrder?: number,
        public sid?: number,
        public mask?: number,
        public granting?: number,
        public auditSuccess?: number,
        public auditFailure?: number
    ) {}
}
