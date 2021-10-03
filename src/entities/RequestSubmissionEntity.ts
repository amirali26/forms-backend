export enum RequestStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HANDLED = 'HANDLED',
}
export interface IRequestSubmissionEntity {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    case: string,
    status: RequestStatus,
    createdDate: string,
    topic: string,
}