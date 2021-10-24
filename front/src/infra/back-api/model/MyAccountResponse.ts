export class MyAccountResponse {
    public extAccountId: string;
    public name: string;
    public link: string;
    public description: string;

    constructor(extAccountId: string,
                name: string,
                link: string,
                description: string) {
        this.extAccountId = extAccountId;
        this.name = name;
        this.link = link;
        this.description = description;
    }
}