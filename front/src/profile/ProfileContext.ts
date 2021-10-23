import Account from "./Account";

const accountStorageKey: string = '01ed2c35e94475d6fa1392ad446c8812';

export interface IProfileContext {
    setAccountToEdit(account: Account): void;

    getAccountToEdit(): Account | undefined;

    clearAccountToEdit(): void;
}

export class ProfileContext implements IProfileContext {
    setAccountToEdit(account: Account): void {
        sessionStorage.setItem(accountStorageKey, JSON.stringify(account));
    }

    getAccountToEdit(): Account | undefined {
        const retrievedObject = sessionStorage.getItem(accountStorageKey);
        if(retrievedObject){
            return JSON.parse(retrievedObject) as Account;
        }

        return undefined;
    }

    clearAccountToEdit(): void {
        sessionStorage.removeItem(accountStorageKey);
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