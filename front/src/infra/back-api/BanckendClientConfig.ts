import {EnvVarsProvider} from "../../EnvVarsProvider";

export interface IBackendClientConfig{
    get tokenUrl(): string;
    get accountsUrl(): string;
    incClicksUrl(extAccId: string): string;
    get myAccountsUrl(): string
    get createAccountUrl(): string
    get updateAccountUrl(): string
    get deleteAccountUrl(): string
}

export class BackendClientConfig implements IBackendClientConfig {
    private readonly env = new EnvVarsProvider();

    get tokenUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/token/google";
    }

    get accountsUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/find-all";
    }

    incClicksUrl(extAccId: string): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/" + extAccId +"/clicks/inc";
    }

    get myAccountsUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/find-all";
    }

    get createAccountUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/create";
    }

    get updateAccountUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/update";
    }

    get deleteAccountUrl(): string {
        return this.env.getVar("REACT_APP_BACK_BASE_URL") + "/accounts/my/";
    }
}