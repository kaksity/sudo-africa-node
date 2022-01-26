import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export class HttpClient{
    private readonly _instance: AxiosInstance;
    /**
     * This is the Http Client to make the request and also get the response
     */
    constructor(@inject("secretKey")secretKey: string) {
        this._instance = axios.create({
            baseURL: 'https://api.sandbox.sudo.cards',
            headers: {
                'Authorization': `Bearer ${secretKey}`
            }
        });        

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this._instance.interceptors.response.use(response => {
            return Promise.resolve(response.data);
        },error => {
            return Promise.reject(error.response.data);
        });
    }
    
    public get(url: string){
        return this._instance.get(url).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public post(url: string, data: any)
    {
        return this._instance.post(url,data).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    public put(url: string, data:any)
    {
        return this._instance.put(url,data).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            return Promise.reject(error);
        })
    }
}
