export interface IAclClass {
    id?: number;
    classPath?: string;
}

export class AclClass implements IAclClass {
    constructor(public id?: number, public classPath?: string) {}
}
