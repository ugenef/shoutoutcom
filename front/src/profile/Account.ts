export default class Account {
    public name: string;
    public link: string;
    public description: string;
    public extAccountId: string;

    constructor(name: string, link: string, description: string, extAccountId: string) {
        this.name = name;
        this.link = link;
        this.description = description;
        this.extAccountId = extAccountId;
    }
}