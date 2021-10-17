import {BackendClientConfig, IBackendClientConfig} from "./BanckendClientConfig";
import {JwtRequest} from "./model/JwtRequest";
import {JwtResponse} from "./model/JwtResponse";

export interface IBackendClient {
    get_jwt(googleToken: string): Promise<string>;
    setJwt(jwt: string): void;
}

export class BackendClient implements IBackendClient {
    private jwt: string | undefined;
    private readonly config: IBackendClientConfig = new BackendClientConfig();

    async get_jwt(googleToken: string): Promise<string> {
        const request = new JwtRequest(googleToken);
        const response = await this.post<JwtRequest, JwtResponse>(this.config.token_url, request);
        return response.jwt;
    }

    setJwt(jwt: string): void{
        this.jwt = jwt;
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
