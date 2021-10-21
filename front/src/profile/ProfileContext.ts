import Account from "./Account";
import {IUserContext, UserContext} from "../user/UserContext";

export interface IProfileContext {
    setAccountToEdit(account: Account): void;

    getAccountToEdit(): Account | undefined;

    clearAccountToEdit(): void;
}

export class ProfileContext implements IProfileContext {
    private accountToEdit: Account | undefined;

    setAccountToEdit(account: Account): void {
        this.accountToEdit = account;
    }

    getAccountToEdit(): Account | undefined {
        return this.accountToEdit;
    }

    clearAccountToEdit(): void {
        this.accountToEdit = undefined;
    }
}

export class ProfileContextFactory {
    private static instance: IProfileContext;

    public static get(): IProfileContext {
        let instance = this.instance;
        if (!instance) {
            instance = new ProfileContext()
            this.instance = instance;
        }
        return instance;
    }
}