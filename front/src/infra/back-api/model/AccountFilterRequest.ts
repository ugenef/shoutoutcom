export class AccountFilterRequest {
    public skip: number;
    public take: number;

    constructor(skip: number,
                take: number) {
        this.skip = skip;
        this.take = take;
    }
}