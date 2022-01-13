import { autoInjectable, inject } from 'tsyringe';
import { Customer, CustomerType } from './customers.interface';
import { HttpClient } from '../http/index';

@autoInjectable()
export class CustomerService{
    
    private readonly _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;    
    }
    
    async createCustomer(newCustomer: Customer): Promise<Customer> {
        try {
            let response = await this._httpClient.post('/customers',newCustomer); 
            let data = response.data;            
            let result: Customer = {
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
            return result;

        } catch (error) {
            return error;   
        }
    }
    async getAllCustomers(page: number = 1, limit: number = 25): Promise<Array<Customer>> {
        try {
            let response: any = await this._httpClient.get(`/customers?pages=${page}&limit=${limit}`);
            let data:any[] = response.data;

            let results: Array<Customer> = [];
            for(let i=0; i < data.length; i++){
                let record:Customer = {
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
                    status: data[i].status
                }
                results.push(record);
            }
            return results;
        } catch (error) {
            return error;
        }
    }
    async getCustomerById(customerId: string): Promise<Customer> {
        try {
            let response: any = await this._httpClient.get(`/customers/${customerId}`).then().catch();
            let data = response.data;
            let result: Customer = {
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
            return result;
        } catch (error) {
            return error;
        }
    }

}