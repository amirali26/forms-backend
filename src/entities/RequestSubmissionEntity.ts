export enum RequestStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HANDLED = 'HANDLED',
}

export enum CASES {
    BUSINESSPREMISES = 'Business Premises',
    COMPANYANDCOMMERCIAL = 'Company and Commercial',
    DISUPTERESOLUTION ='Dispute Resolution',
    ENERGYUTILITIES = 'Energy, Utilities and Transport',
    MEDIAANDPROPERTY ='Media IT and Intellectual Property',
    REGULATIONANDCOMPLIANCE = 'Regulation and Compliance',
    ACCIDENTANDINJURY = 'Accident and Injury',
    CONSUMERANDCIVILRIGHTS ='Consumer and Civil Rights',
    EMPLOYMENT = 'Employment',
    FAMILY = 'Family and Relationships',
    HOUSES = 'Houses, Property and Neighbors',
    IMMIGRATION = 'Immigration and Changing Countries',
    MENTAL = 'Mental Capacity',
    MONEYDEBT = 'Money and Debit',
    SOCIALWELFARE = 'Social Welfare, health and Benefits',
    WILLS = 'Wills, Trusts and Probate',
}

export interface IRequestSubmissionEntity {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    case: string,
    status: RequestStatus,
    createdDate: string,
    topic: CASES,
}