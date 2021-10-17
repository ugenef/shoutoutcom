import {EnvVarsProvider} from "../EnvVarsProvider";

export interface IHeaderConfig{
    get client_id(): string
}

export class HeaderConfig implements IHeaderConfig {
    private readonly env = new EnvVarsProvider();

    get client_id(): string{
        return this.env.getVar("REACT_APP_GOOGLE_CLIENT_ID");
    }
}