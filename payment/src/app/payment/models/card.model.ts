export class Card {
    name: string = '';
    number: string = '';
    expiry: string = '';
    cvv: string = '';
    constructor(name, number, expiry, cvv) {
        this.name = name;
        this.number = number;
        this.expiry = expiry;
        this.cvv = cvv;
    }
}