import _ from 'lodash';
import { Person } from "./fullName.js";

class Address {
    constructor(street, city, country) {
        this._street = street;
        this._city = city;
        this._country = country;
    }
    
    get street() {
        return this._street;
    }

    get city() {
        return this._city;
    }
    
    get country() {
        return this._country;
    }
}


const p1 = new Person("John", "Doe", "111-22-3333");
p1.address = new Address("123 Main St", "Anytown", "USA");
p1.birthYear = 1990;

const p2 = new Person("Barkley", "Rosser", "222-33-4444");
p2.address = new Address("123 Main St", "Anytown", "USB");
p2.birthYear = 1990;


const p3 = new Person("Haskell", "Curry", "555-66-6789");
p3.address = new Address("123 Main St", "Anytown", "USC");
p3.birthYear = 1990;

const p4 = new Person("Alonzo", "Church", "666-77-8888");
p4.address = new Address("123 Main St", "Anytown", "USD");
p4.birthYear = 1990;


const name = p => p.firstname

console.log(name(p1));

var result = [];
var persons = [p1, p2, p3, p4];

for(let i = 0; i < persons.length; i++) {
    var p = persons[i];
    if(p !== null && p !== undefined) {
        result.push(p.fullname)
    }
}

console.log(result);

const result2 = _.map(persons, s => (s !== null && s !== undefined ? s.fullname : ''));

console.log(result2);
