import 'reflect-metadata';
import { config } from 'dotenv';
config();
import { container } from 'tsyringe';
import { CustomerService } from './services/customers/customers.services';
import { CreateCompanyCustomer, CustomerStatus, CustomerType } from './Interfaces/customer/customers.interface';


class Sudo{
    
    public customers:CustomerService;

    constructor(secretKey: string) {
        
        container.register("secretKey",{ useValue:secretKey });
        this.customers = container.resolve(CustomerService);    
    }    
}

export default Sudo;

// (() => {
//     // let secretKey = "test 123";
//     let secretKey =process.env.SECRET_KEY as string;

//     let sudoInstance = new Sudo(secretKey);

//     try {
        
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
        
//         // sudoInstance.customers.createCompanyCustomer(companyCustomer).then(results => {
//         //     console.log(results);
//         // }).catch(error => {
//         //     console.log(error);
//         // })
//       