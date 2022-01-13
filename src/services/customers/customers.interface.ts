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

interface Company{
    firstName: string,
    lastName: string,
    otherNames: string,
    dob: Date,
    identity: Identity
}

interface Individual{
    firstName: string,
    lastName: string,
    otherNames: string,
    dob: string,
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

export interface Customer{
    id?: string,
    business?: string,
    type: CustomerType,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    individual: Company | Individual,
    status: CustomerStatus,
    billingAddress: BillingAddress
}