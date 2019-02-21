export interface IAcl_Class {
    id?: number;
    classPath?: string;
}

export class Acl_Class implements IAcl_Class {
    constructor(public id?: number, public classPath?: string) {}
}
