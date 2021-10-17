export class JwtRequest {
    public idToken: string;

    public constructor(idToken: string) {
        this.idToken = idToken;
    }
}