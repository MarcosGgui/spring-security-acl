export interface INoticeMessage {
    id?: number;
    content?: string;
}

export class NoticeMessage implements INoticeMessage {
    constructor(public id?: number, public content?: string) {}
}
