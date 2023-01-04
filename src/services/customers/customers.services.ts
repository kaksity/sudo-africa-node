import { autoInjectable, inject } from 'tsyringe';
import { CustomerType, CreateCustomer, UpdateCustomer, CreateIndividualCustomer, CreateCompanyCustomer, ReadIndividualCustomer, ReadCompanyCustomer } from '../../Interfaces/customer/customers.interface';
import { HttpClient } from '../http/index';

@autoInjectable()
export class CustomerService{
    
    private readonly _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;    
    }
    
    public async createIndividualCustomerRecord(newIndividualCustomer: CreateIndividualCustomer): Promise<ReadIndividualCustomer> {
        try {
            const { data: customer } = await this._httpClient.post('/customers', newIndividualCustomer);
            return this.processIndividualCustomerRecord(customer);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createCompanyCustomerRecord(newCompanyCustomer: CreateCompanyCustomer): Promise<ReadCompanyCustomer> {
        try {
            const { data: customer } = await this._httpClient.post('/customers', newCompanyCustomer)
            return this.processCompanyCustomerRecord(customer)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    public async getAllCustomerRecords(page: number = 1, limit: number = 25): Promise<Array<ReadIndividualCustomer | ReadCompanyCustomer>> {
        try {
            let { data } = await this._httpClient.get(`/customers?pages=${page}&limit=${limit}`);
            let results: Array<ReadCompanyCustomer | ReadIndividualCustomer> = [];
            data.forEach(customer => {
                results.push(this.processCustomerRecord(customer))
            });
            return Promise.resolve(results);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getCustomerRecordById(customerId: string): Promise<ReadIndividualCustomer | ReadCompanyCustomer> {
        try {
            let response: any = await this._httpClient.get(`/customers/${customerId}`);
            let { data } = response
            return this.processCustomerRecord(data)

        } catch (error) {
            return error;
        }
    }
    private processCustomerRecord(customer) {
        return customer.type == CustomerType.INDIVIDUAL ? this.processIndividualCustomerRecord(customer) : this.processCompanyCustomerRecord(customer);
    }
    private processIndividualCustomerRecord(customer): ReadIndividualCustomer {
        let individualCustomer: ReadIndividualCustomer = {
            id: customer._id,
            business: customer.business,
            type: (customer.type == 'individual') ? CustomerType.INDIVIDUAL : CustomerType.COMPANY,
            name: customer.name,
            emailAddress:customer.emailAddress,
            phoneNumber: customer.phoneNumber,
            individual: {
                id: customer.individual._id,
                firstName: customer.individual.firstName,
                lastName: customer.individual.lastName,
                otherNames: customer.individual.otherNames,
                dob: (customer.individual.dob == null) ? '' : customer.individual.dob,
                identity: {
                    id: customer.individual.identity._id,
                    type: customer.individual.identity.type,
                    number: customer.individual.identity.number
                }
            },
            billingAddress:{
                id: customer.billingAddress._id,
                line1: customer.billingAddress.line1,
                line2: customer.billingAddress.line2,
                city: customer.billingAddress.city,
                state: customer.billingAddress.state,
                country: customer.billingAddress.country,
                postalCode: customer.billingAddress.postalCode
            },
            status: customer.status
        }
        return individualCustomer;
    }
    private processCompanyCustomerRecord(customer) {
        let companyCustomer: ReadCompanyCustomer = {
            id: customer._id,
            business: customer.business,
            type: CustomerType.COMPANY,
            name: customer.name,
            emailAddress:customer.emailAddress,
            phoneNumber: customer.phoneNumber,
            company: {
                id: customer.company._id,
                name: customer.company.name,
                officer: {
                    id: customer.company.officer._id,
                    firstName: customer.company.officer.firstName,
                    lastName: customer.company.officer.lastName
                }
            },
            billingAddress:{
                id: customer.billingAddress._id,
                line1: customer.billingAddress.line1,
                line2: customer.billingAddress.line2,
                city: customer.billingAddress.city,
                state: customer.billingAddress.state,
                country: customer.billingAddress.country,
                postalCode: customer.billingAddress.postalCode
            },
            status: customer.status
        }
        return companyCustomer;
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
