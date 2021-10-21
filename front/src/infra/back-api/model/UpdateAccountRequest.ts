export class UpdateAccountRequest {
    public extAccountId: string;
    public newDescription: string;

    constructor(extAccountId: string,
                newDescription: string) {
        this.extAccountId = extAccountId;
        this.newDescription = newDescription;
    }
}