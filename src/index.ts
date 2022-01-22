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


(() => {
    let secretKey = process.env.SECRET_KEY as string;

    let sudoInstance = new Sudo(secretKey);

    try {
        
        
        sudoInstance.customers.getAllCustomers(1,25).then(results => {
            console.log(`-----------------Getting all the customers--------------------------`)
            console.log(results);;
        }).catch(error => {
            console.log(error);
        });
        
        
        // sudoInstance.customers.getCustomerById('61e02642e5b97959404c324f').then(results => {
        //     console.log(`---------------------Get a single individual customer------------------`);
        //     console.log(results);
        // }).catch(error => {
        //     console.log(error);
        // });
        // sudoInstance.customers.getCustomerById('61e3273de4d97fa8915b3749').then(results => {
        //     console.log(`---------------------Get a single company customer------------------`);
        //     console.log(results);
        // }).catch(error => {
        //     console.log(error);
        // });
    } catch (error) {
        console.log(error);
    }
})()

let name = "Name"