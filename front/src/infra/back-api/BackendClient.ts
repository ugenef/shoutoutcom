import {BackendClientConfig, IBackendClientConfig} from "./BanckendClientConfig";
import {JwtRequest} from "./model/JwtRequest";
import {JwtResponse} from "./model/JwtResponse";
import {AccountResponse} from "./model/AccountResponse";
import {CreateAccountRequest} from "./model/CreateAccountRequest";
import {UpdateAccountRequest} from "./model/UpdateAccountRequest";

export interface IBackendClient {
    getJwt(googleToken: string): Promise<string>;
    getMyAccounts(jwt: string): Promise<AccountResponse[]>;
    createAccount(request: CreateAccountRequest, jwt: string): Promise<void>;
    updateAccount(request: UpdateAccountRequest, jwt: string): Promise<void>;
}

export class BackendClient implements IBackendClient {
    private readonly config: IBackendClientConfig = new BackendClientConfig();

    async getJwt(googleToken: string): Promise<string> {
        const request = new JwtRequest(googleToken);
        const response = await this.postJson<JwtRequest, JwtResponse>(this.config.token_url, request);
        return response.jwt;
    }

    async createAccount(request: CreateAccountRequest, jwt: string): Promise<void> {
        await this.postNoParseResponse<CreateAccountRequest>(this.config.create_account_url, request, jwt);
    }

    async updateAccount(request: UpdateAccountRequest, jwt: string): Promise<void> {
        await this.postNoParseResponse<UpdateAccountRequest>(this.config.update_account_url, request, jwt);
    }

    async getMyAccounts(jwt: string): Promise<AccountResponse[]>{
        const response = await this.get<AccountResponse[]>(this.config.my_accounts_url, jwt);
        return response;
    }

    private async getJson<TRequest, TResponse>(url: string, request: TRequest, jwt?: string) : Promise<TResponse> {
        const response = await this.makeRequest(url, 'GET', jwt, request);
        return await response.json();
    }

    private async get<TResponse>(url: string, jwt: string) : Promise<TResponse> {
        const response = await this.makeRequest(url, 'GET', jwt);
        return await response.json();
    }

    private async postJson<TRequest, TResponse>(url: string,request: TRequest, jwt?: string) : Promise<TResponse> {
        const response = await this.makeRequest(url, 'POST', jwt, request);
        return await response.json();
    }

    private async postNoParseResponse<TRequest>(url: string,  request: TRequest, jwt?: string) : Promise<void> {
        await this.makeRequest(url, 'POST', jwt, request);
    }

    private makeRequest(url: string, method: string, jwt?: string, request?: any) : Promise<Response>{
        const headers: { [name: string] : string; } = {};
        if(request){
            headers['Content-Type'] = 'application/json';
        }
        if(jwt){
            headers['Authorization'] = `Bearer ${jwt}`;
        }

        return fetch(url,
            {
                method: method,
                mode: 'cors',
                headers: headers,
                body: request ? JSON.stringify(request) : undefined
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                return response;
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
