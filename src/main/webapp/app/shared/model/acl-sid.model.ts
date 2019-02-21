export interface IAcl_Sid {
    id?: number;
    principal?: number;
    sid?: string;
}

export class Acl_Sid implements IAcl_Sid {
    constructor(public id?: number, public principal?: number, public sid?: string) {}
}
