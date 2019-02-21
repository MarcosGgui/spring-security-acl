export interface IAclSid {
    id?: number;
    principal?: number;
    sid?: string;
}

export class AclSid implements IAclSid {
    constructor(public id?: number, public principal?: number, public sid?: string) {}
}
