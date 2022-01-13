import 'reflect-metadata';
import { config } from 'dotenv';
config();
import { container } from 'tsyringe';
import { CustomerService } from './services/customers/customers.services';


class Sudo{
    
    public customers:CustomerService;

    constructor(secretKey: string) {
        
        container.register("secretKey",{ useValue:secretKey });
        this.customers = container.resolve(CustomerService);    
    }    
}

export default Sudo;