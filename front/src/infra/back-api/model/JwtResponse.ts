export class JwtResponse {
    public jwt: string;

    public constructor(jwt: string) {
        this.jwt = jwt;
    }
}