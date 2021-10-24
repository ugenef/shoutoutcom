import {BackendClientConfig, IBackendClientConfig} from "./BanckendClientConfig";
import {JwtRequest} from "./model/JwtRequest";
import {JwtResponse} from "./model/JwtResponse";
import {MyAccountResponse} from "./model/MyAccountResponse";
import {CreateAccountRequest} from "./model/CreateAccountRequest";
import {UpdateAccountRequest} from "./model/UpdateAccountRequest";
import {AccountResponse} from "./model/AccountResponse";
import {AccountFilterRequest} from "./model/AccountFilterRequest";

export interface IBackendClient {
    getJwt(googleToken: string): Promise<string>;
    getAccounts(skip: number, take: number): Promise<AccountResponse[]>;
    incClicks(extAccountId: string): Promise<void>;
    getMyAccounts(jwt: string): Promise<MyAccountResponse[]>;
    createAccount(request: CreateAccountRequest, jwt: string): Promise<void>;
    updateAccount(request: UpdateAccountRequest, jwt: string): Promise<void>;
    deleteAccount(extAccountId: string, jwt: string): Promise<void>;
}

export class BackendClient implements IBackendClient {
    private readonly config: IBackendClientConfig = new BackendClientConfig();

    async getJwt(googleToken: string): Promise<string> {
        const request = new JwtRequest(googleToken);
        const response = await this.postWithJson<JwtRequest, JwtResponse>(this.config.tokenUrl, request);
        return response.jwt;
    }

    async createAccount(request: CreateAccountRequest, jwt: string): Promise<void> {
        await this.postNoParseResponse<CreateAccountRequest>(this.config.createAccountUrl, request, jwt);
    }

    async updateAccount(request: UpdateAccountRequest, jwt: string): Promise<void> {
        await this.postNoParseResponse<UpdateAccountRequest>(this.config.updateAccountUrl, request, jwt);
    }

    async getAccounts(skip: number, take: number): Promise<AccountResponse[]>{
        const filter = new AccountFilterRequest(skip, take);
        return await this.postWithJson<AccountFilterRequest, AccountResponse[]>(this.config.accountsUrl, filter);
    }

    async getMyAccounts(jwt: string): Promise<MyAccountResponse[]>{
        return await this.get<MyAccountResponse[]>(this.config.myAccountsUrl, jwt);
    }

    async deleteAccount(extAccountId: string, jwt:string): Promise<void>{
        await this.delete(this.config.deleteAccountUrl + extAccountId, jwt);
    }

    async incClicks(extAccountId: string): Promise<void>{
        await this.patch(this.config.incClicksUrl(extAccountId));
    }

    private async getWithJson<TRequest, TResponse>(url: string, request: TRequest, jwt?: string) : Promise<TResponse> {
        const response = await this.makeRequest(url, 'GET', jwt, request);
        return await response.json();
    }

    private async get<TResponse>(url: string, jwt: string) : Promise<TResponse> {
        const response = await this.makeRequest(url, 'GET', jwt);
        return await response.json();
    }

    private async patch(url: string) : Promise<void> {
        await this.makeRequest(url, 'PATCH');
    }

    private async delete(url: string, jwt: string) : Promise<void> {
        await this.makeRequest(url, 'DELETE', jwt);
    }

    private async postWithJson<TRequest, TResponse>(url: string, request: TRequest, jwt?: string) : Promise<TResponse> {
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
