export enum IdentityType{
    BVN = "BVN",
    NIN = "NIN",
    CAC = "CAC",
    TIN = "TIN",
}

export enum CustomerStatus{
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export enum CustomerType{
    INDIVIDUAL = "individual",
    COMPANY = "company"
}

interface Identity{
    id?: string,
    type: IdentityType,
    number: string
}


interface Officer {
    id?: string,
    firstName: string,
    lastName: string
}
interface Company{
    id?: string,
    name: string,
    officer: Officer
}

interface Individual{
    firstName: string,
    lastName: string,
    otherNames?: string,
    dob?: string,
    id?: string,
    identity?: Identity
}
interface BillingAddress{
    id?: string,
    line1: string,
    line2?: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
}
export interface CreateCustomer{
    type: CustomerType,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    individual: Company | Individual,
    status: CustomerStatus,
    billingAddress: BillingAddress
}

export interface CreateIndividualCustomer {
    type: CustomerType.INDIVIDUAL,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    individual: Individual,
    status: CustomerStatus,
    billingAddress: BillingAddress
}


export interface UpdateIndividualCustomer {
    type: CustomerType.INDIVIDUAL,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    individual: Individual,
    status: CustomerStatus,
    billingAddress: BillingAddress
}

export interface CreateCompanyCustomer {
    type: CustomerType.COMPANY,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    company: Company,
    status: CustomerStatus,
    billingAddress: BillingAddress
}

export interface ReadIndividualCustomer {
    id: string,
    business: string,
    type: CustomerType,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    individual: Individual,
    status: CustomerStatus,
    billingAddress: BillingAddress
}

export interface ReadCompanyCustomer {
    id: string,
    business: string,
    type: CustomerType.COMPANY,    
    name: string,
    phoneNumber: string,
    emailAddress: string,
    company: Company,
    status: CustomerStatus,
    billingAddress: BillingAddress
}

export interface UpdateCustomer{
    id: string,
    business?: string,
    type: CustomerType,
    name: string,
    phoneNumber?: string,
    emailAddress?: string,
    individual: Company | Individual,
    status: CustomerStatus,
    billingAddress?: BillingAddress
}
