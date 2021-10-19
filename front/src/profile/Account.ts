export default class Account {
    public name: string;
    public link: string;
    public description: string;

    constructor(name: string, link: string, description: string) {
        this.name = name;
        this.link = link;
        this.description = description;
    }
}