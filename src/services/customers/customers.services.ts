import { autoInjectable, inject } from 'tsyringe';
import { CustomerType, CreateCustomer, UpdateCustomer, CreateIndividualCustomer, CreateCompanyCustomer, ReadIndividualCustomer, ReadCompanyCustomer } from './customers.interface';
import { HttpClient } from '../http/index';

@autoInjectable()
export class CustomerService{
    
    private readonly _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;    
    }
    
    async createIndividualCustomer(newIndividualCustomer: CreateIndividualCustomer): Promise<ReadIndividualCustomer> {
        try {
            let response = await this._httpClient.post('/customers', newIndividualCustomer); 
            let data = response.data;            
            let result: ReadIndividualCustomer = {
                id: data._id,
                business: data.business,
                type: (data.type == 'individual') ? CustomerType.INDIVIDUAL : CustomerType.COMPANY,
                name: data.name,
                emailAddress:data.emailAddress,
                phoneNumber: data.phoneNumber,
                individual: {
                    id: data.individual._id,
                    firstName: data.individual.firstName,
                    lastName: data.individual.lastName,
                },
                billingAddress:{
                    id: data.billingAddress._id,
                    line1: data.billingAddress.line1,
                    line2: data.billingAddress.line2,
                    city: data.billingAddress.city,
                    state: data.billingAddress.state,
                    country: data.billingAddress.country,
                    postalCode: data.billingAddress.postalCode
                },
                status: data.status
            }
            return result;

        } catch (error) {
            return error;   
        }
    }
    async createCompanyCustomer(newCompanyCustomer: CreateCompanyCustomer): Promise<ReadCompanyCustomer> {
        try {
            let response = await this._httpClient.post('/customers', newCompanyCustomer); 
            let data = response.data;            
            let result: ReadCompanyCustomer = {
                id: data._id,
                business: data.business,
                type: CustomerType.COMPANY,
                name: data.name,
                emailAddress:data.emailAddress,
                phoneNumber: data.phoneNumber,
                company: {
                    id: data.company._id,
                    name: data.company.name,
                    officer: {
                        id: data.company.officer._id,
                        firstName: data.company.officer.firstName,
                        lastName: data.company.officer.lastName
                    }
                },
                billingAddress:{
                    id: data.billingAddress._id,
                    line1: data.billingAddress.line1,
                    line2: data.billingAddress.line2,
                    city: data.billingAddress.city,
                    state: data.billingAddress.state,
                    country: data.billingAddress.country,
                    postalCode: data.billingAddress.postalCode
                },
                status: data.status
            }
            return result;

        } catch (error) {
            return error;   
        }
    }
    async getAllCustomers(page: number = 1, limit: number = 25): Promise<Array<ReadIndividualCustomer | ReadCompanyCustomer>> {
        return this._httpClient.get(`/customers?pages=${page}&limit=${limit}`).then(response => {
            let data:any[] = response.data;
            // console.log(data);
            let results: Array<ReadCompanyCustomer | ReadIndividualCustomer> = [];
            for(let i=0; i < data.length; i++){
                if (data[i].type == CustomerType.INDIVIDUAL) {
                    let record:ReadIndividualCustomer = {
                        id: data[i]._id,
                        business: data[i].business,
                        type: (data[i].type == 'individual') ? CustomerType.INDIVIDUAL : CustomerType.COMPANY,
                        name: data[i].name,
                        emailAddress:data[i].emailAddress,
                        phoneNumber: data[i].phoneNumber,
                        individual: {
                            id: data[i].individual._id,
                            firstName: data[i].individual.firstName,
                            lastName: data[i].individual.lastName,
                            otherNames: data[i].individual.otherNames,
                            dob: (data[i].individual.dob == null) ? '' : data[i].individual.dob,
                        },
                        billingAddress:{
                            id: data[i].billingAddress._id,
                            line1: data[i].billingAddress.line1,
                            line2: data[i].billingAddress.line2,
                            city: data[i].billingAddress.city,
                            state: data[i].billingAddress.state,
                            country: data[i].billingAddress.country,
                            postalCode: data[i].billingAddress.postalCode
                        },
                        status: data[i].status,
                    }
                    results.push(record);
                }
                else {
                    let record: ReadCompanyCustomer = {
                        id: data[i]._id,
                        business: data[i].business,
                        type: CustomerType.COMPANY,
                        name: data[i].name,
                        emailAddress:data[i].emailAddress,
                        phoneNumber: data[i].phoneNumber,
                        company: {
                            id: data[i].company._id,
                            name: data[i].company.name,
                            officer: {
                                id: data[i].company.officer._id,
                                firstName: data[i].company.officer.firstName,
                                lastName: data[i].company.officer.lastName
                            }
                        },
                        billingAddress:{
                            id: data[i].billingAddress._id,
                            line1: data[i].billingAddress.line1,
                            line2: data[i].billingAddress.line2,
                            city: data[i].billingAddress.city,
                            state: data[i].billingAddress.state,
                            country: data[i].billingAddress.country,
                            postalCode: data[i].billingAddress.postalCode
                        },
                        status: data[i].status
                    }
                    results.push(record);
                }
            }
            return results;
        }).catch(error => {
            return error;
        });            
    }
    async getCustomerById(customerId: string): Promise<ReadIndividualCustomer | ReadCompanyCustomer> {
        try {
            let response: any = await this._httpClient.get(`/customers/${customerId}`).then().catch();
            let data = response.data;
            if ( data.type == CustomerType.INDIVIDUAL) {
                let individualCustomer: ReadIndividualCustomer = {
                    id: data._id,
                    business: data.business,
                    type: (data.type == 'individual') ? CustomerType.INDIVIDUAL : CustomerType.COMPANY,
                    name: data.name,
                    emailAddress:data.emailAddress,
                    phoneNumber: data.phoneNumber,
                    individual: {
                        id: data.individual._id,
                        firstName: data.individual.firstName,
                        lastName: data.individual.lastName,
                        otherNames: data.individual.otherNames,
                        dob: (data.individual.dob == null) ? '' : data.individual.dob,
                        identity: {
                            id: data.individual.identity._id,
                            type: data.individual.identity.type,
                            number: data.individual.identity.number
                        }
                    },
                    billingAddress:{
                        id: data.billingAddress._id,
                        line1: data.billingAddress.line1,
                        line2: data.billingAddress.line2,
                        city: data.billingAddress.city,
                        state: data.billingAddress.state,
                        country: data.billingAddress.country,
                        postalCode: data.billingAddress.postalCode
                    },
                    status: data.status
                }
                return individualCustomer;
            }
            else{
                let companyCustomer: ReadCompanyCustomer = {
                    id: data._id,
                    business: data.business,
                    type: CustomerType.COMPANY,
                    name: data.name,
                    emailAddress:data.emailAddress,
                    phoneNumber: data.phoneNumber,
                    company: {
                        id: data.company._id,
                        name: data.company.name,
                        officer: {
                            id: data.company.officer._id,
                            firstName: data.company.officer.firstName,
                            lastName: data.company.officer.lastName
                        }
                    },
                    billingAddress:{
                        id: data.billingAddress._id,
                        line1: data.billingAddress.line1,
                        line2: data.billingAddress.line2,
                        city: data.billingAddress.city,
                        state: data.billingAddress.state,
                        country: data.billingAddress.country,
                        postalCode: data.billingAddress.postalCode
                    },
                    status: data.status
                }
                return companyCustomer;
            }

        } catch (error) {
            return error;
        }
    }
    // async updateCustomer(updateCustomer: UpdateCustomer): Promise<ReadCustomer> {
    //     try {
    //         let updatedCustomer = this._httpClient.put(`/customers/${updateCustomer.id}`,updateCustomer);
    //         return updatedCustomer;
    //     } catch (error) {
    //         return error
    //     }
    // }
}                