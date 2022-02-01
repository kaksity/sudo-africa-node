import { expect } from 'chai';
import { config } from 'dotenv';
import Sudo from '../src';
import { CreateCompanyCustomer, CustomerStatus, CustomerType, CreateIndividualCustomer } from '../src/Interfaces/customer/customers.interface';
config();

describe('All Customer Operations',() => {
    //const sudoInstance = new Sudo();
    let secretKey = process.env.SECRET_KEY as string;

    let sudoInstance = new Sudo(secretKey);

    // it('Should create a new Individual Customer', async() => {
    //     let indivudalCustomer: CreateIndividualCustomer = {
    //         type: CustomerType.INDIVIDUAL,
    //         name: "Test Individual",
    //         phoneNumber: "",
    //         emailAddress: "",
    //         individual:{
    //             firstName: "Test I",
    //             lastName: "Test I"
    //         },
    //         status: CustomerStatus.ACTIVE,
    //         billingAddress: {
    //             line1: "Test I Line 1",
    //             city: "Test I City 1",
    //             state: "Borno",
    //             country: "Nigeria",
    //             postalCode: "12345"
    //         }
    //     };
    //     let results = await sudoInstance.customers.createIndividualCustomer(indivudalCustomer);
    //     expect(results).to.be.an('object');
    // });

    // it('Should create a new Company Customer', async() => {
    //     let companyCustomer: CreateCompanyCustomer = {
    //         type: CustomerType.COMPANY,
    //         name: "Test Company",
    //         emailAddress: "",
    //         phoneNumber: "",
    //         company: {
    //             name: "Test Company",
    //             officer: {
    //                 firstName: "Test C",
    //                 lastName: "Test C"
    //             }
    //         },
    //         status: CustomerStatus.ACTIVE,
    //         billingAddress: {
    //             line1: "Test C Line 1",
    //             city: "Test C City 1",
    //             state: "Borno",
    //             country: "Nigeria",
    //             postalCode: "12345"
    //         }
    //     } 
    //     let createdCompanyCustomer = await sudoInstance.customers.createCompanyCustomer(companyCustomer);
    //     expect(createdCompanyCustomer).to.be.an('object');
    // });

    it('Should Get all the Customers', async() => {
        
        let allCustomers = await sudoInstance.customers.getAllCustomers();
        expect(allCustomers).to.be.an('array');
        
    });
    
    it('Should Get a Company customer', async() => {
        
        let singleCustomer = await sudoInstance.customers.getCustomerById('61e3273de4d97fa8915b3749');
        expect(singleCustomer).to.be.an('object').to.have.property('company');

    });

    it('Should Get an Individual customer',async() => {

        let singleCustomer = await sudoInstance.customers.getCustomerById('61e02642e5b97959404c324f');
        expect(singleCustomer).to.be.an('object').to.have.property('individual');
    });

});