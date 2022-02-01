import { expect } from 'chai';
import { config } from 'dotenv';
import Sudo from '../src';
import { CreateCompanyCustomer, CustomerStatus, CustomerType } from '../src/Interfaces/customer/customers.interface';
config();

describe('All Customer Operations',() => {
    //const sudoInstance = new Sudo();
    let secretKey = process.env.SECRET_KEY as string;

    let sudoInstance = new Sudo(secretKey);

    it('Should create a new Individual Customer', () => {
        
    });

    it('Should create a new Company Customer', async() => {
        let companyCustomer: CreateCompanyCustomer = {
            type: CustomerType.COMPANY,
            name: "Haigha Technology",
            emailAddress: "",
            phoneNumber: "",
            company: {
                name: "Haigha Technology",
                officer: {
                    firstName: "Harun",
                    lastName: "Abubakar"
                }
            },
            status: CustomerStatus.ACTIVE,
            billingAddress: {
                line1: "Along Bama Road",
                city: "Maiduguri",
                state: "Borno",
                country: "Nigeria",
                postalCode: "12345"
            }
        } 
        let createdCompanyCustomer = await sudoInstance.customers.createCompanyCustomer(companyCustomer);
        expect(createdCompanyCustomer).to.be.an('object');
    });

    it('Should Get all the Customers', async() => {
        
        let allCustomers = await sudoInstance.customers.getAllCustomers();
        expect(allCustomers).to.be.an('array');
        

    });
    
    it('Should Get a Company customer', async() => {
        
        let singleCustomer = await sudoInstance.customers.getCustomerById('61e3273de4d97fa8915b3749');
        expect(singleCustomer).to.be.an('object');

    });

    it('Should Get an Individual customer',async() => {

        let singleCustomer = await sudoInstance.customers.getCustomerById('61e02642e5b97959404c324f');
        expect(singleCustomer).to.be.an('object');
    });

});