export class User {
    public jwt: string;

    public constructor(jwt: string) {
        this.jwt = jwt;
    }
}