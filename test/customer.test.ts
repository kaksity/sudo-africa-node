import { expect } from 'chai';
import { config } from 'dotenv';
import Sudo from '../src';
config();

describe('All Customer Operations',() => {
    //const sudoInstance = new Sudo();
    let secretKey = process.env.SECRET_KEY as string;

    let sudoInstance = new Sudo(secretKey);

    it('Should create a new Customer', () => {
        
    });
    
    it('Should Get all the Customers', async() => {
        let allCustomers = await sudoInstance.customers.getAllCustomers();
        expect(allCustomers).to.be.an('array');
    });
    
    it('Should Get a single customer', () => {
        
    });
});