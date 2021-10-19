import {BackendClientConfig, IBackendClientConfig} from "./BanckendClientConfig";
import {JwtRequest} from "./model/JwtRequest";
import {JwtResponse} from "./model/JwtResponse";
import {AccountResponse} from "./model/AccountResponse";

export interface IBackendClient {
    getJwt(googleToken: string): Promise<string>;
    getMyAccounts(): Promise<AccountResponse[]>
    setJwt(jwt: string): void;
}

export class BackendClient implements IBackendClient {
    private jwt: string | undefined;
    private readonly config: IBackendClientConfig = new BackendClientConfig();

    async getJwt(googleToken: string): Promise<string> {
        const request = new JwtRequest(googleToken);
        const response = await this.post<JwtRequest, JwtResponse>(this.config.token_url, request);
        return response.jwt;
    }

    async getMyAccounts(): Promise<AccountResponse[]>{
       const response = await this.getWithJwt<any, AccountResponse[]>(this.config.my_accounts_url);
       return response;
    }

    setJwt(jwt: string): void{
        this.jwt = jwt;
    }

    getWithJwt<TRequest, TResponse>(url: string, request?: TRequest): Promise<TResponse> {
        return fetch(url,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.jwt}`
                },
                body: request ? JSON.stringify(request) : undefined
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<TResponse>;
            })
    }

    post<TRequest, TResponse>(url: string, request: TRequest): Promise<TResponse> {
        return fetch(url,
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<TResponse>;
            })
    }
}

export class BackendClientFactory{
    private static instance: IBackendClient;

    public static get(): IBackendClient {
        let instance = this.instance;
        if (!instance) {
            instance = new BackendClient()
            this.instance = instance;
        }
        return instance;
    }
}
