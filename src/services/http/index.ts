import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export class HttpClient{
    private readonly _instance: AxiosInstance;
    /**
     * This is the Http Client to make the request and also get the response
     */

    constructor(@inject("secretKey")secretKey: string) {
        // let secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRmMzRhNmQwNWMyNWFiMDIxMjMzNWMiLCJlbWFpbEFkZHJlc3MiOiJkYXVkYXBvbmEyQGdtYWlsLmNvbSIsImp0aSI6IjYxZTAwMzQzNDZkZGFjYmFkZTY2NGMxNCIsIm1lbWJlcnNoaXAiOnsiX2lkIjoiNjFkZjM0YTZkMDVjMjVhYjAyMTIzMzVmIiwiYnVzaW5lc3MiOnsiX2lkIjoiNjFkZjM0YTZkMDVjMjVhYjAyMTIzMzVhIiwibmFtZSI6IkhhaWdoYSBUZWNobm9sb2d5IiwiaXNBcHByb3ZlZCI6ZmFsc2V9LCJ1c2VyIjoiNjFkZjM0YTZkMDVjMjVhYjAyMTIzMzVjIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NDIwNzA4NTEsImV4cCI6MTY3MzYyODQ1MX0.7nDHGrInV0R7bqj4t0e6U6RZaIrfmuaHr_VPzI1pT2o";
        this._instance = axios.create({
            baseURL: 'https://api.sandbox.sudo.cards',
            headers: {
                'Authorization': `Bearer ${secretKey}`
            }
        });        

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this._instance.interceptors.response.use(
            this.handleResponse,
            this.handleErrors,
        );
    }
    private handleErrors = (errors: any) => Promise.reject(errors);

    private handleResponse = ({ data }: AxiosResponse) => data;
    
    public get(url: string){
        return this._instance.get(url).then(data => {
            return data;
        }).catch(error => {
            return error;
        });
    }

    public post(url: string, data: any)
    {
        return this._instance.post(url,data).then(data => {
            return data;
        }).catch(error => {
            return error;
        });
    }
    public put(url: string, data:any)
    {
        return this._instance.put(url,data).then(data => {
            return data;
        }).catch(error => {
            return error;
        })
    }
}