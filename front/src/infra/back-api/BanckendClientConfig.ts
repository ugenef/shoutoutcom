import {EnvVarsProvider} from "../../EnvVarsProvider";

export interface IBackendClientConfig{
    get token_url(): string;
    get my_accounts_url(): string
    get create_account_url(): string
    get update_account_url(): string
}

export class BackendClientConfig implements IBackendClientConfig {
    private readonly env = new EnvVarsProvider();

    get token_url(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/token/google";
    }

    get my_accounts_url(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/find-all";
    }

    get create_account_url(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/create";
    }

    get update_account_url(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/update";
    }
}