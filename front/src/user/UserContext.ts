import {User} from "./User";

export interface IUserContext {
    setUser(user: User): void;

    onUserChanged(handler: { (user: User): void }): void;
}

export class UserContext implements IUserContext {
    private readonly handlers: { (user: User): void }[];

    constructor() {
        this.handlers = [];
    }

    public setUser(user: User): void {
        for (let i = 0; i < this.handlers.length; i++) {
            try {
                this.handlers[i](user);
            } catch (err) {
                console.error("Error calling setUser handler", err);
            }
        }
    }

    public onUserChanged(handler: { (user: User): void }): void {
        this.handlers.push(handler);
    }
}

export class UserContextFactory {
    private static instance: IUserContext;

    public static get(): IUserContext {
        let instance = this.instance;
        if (!instance) {
            instance = new UserContext()
            this.instance = instance;
        }
        return instance;
    }
}