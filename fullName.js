class Person {
    constructor(firstname, lastname, ssn) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._ssn = ssn;
        this._address = null;
        this._birthYear = null;
    }

    get ssn() {
        return this._ssn;
    }

    get firstname() {
        return this._firstname;
    }
    
    get lastname() {
        return this._lastname;
    }
    
    get address() {
        return this._address;
    }

    get birthYear() {
        return this._birthYear;
    }

    set birthYear(newBirthYear) {
        this._birthYear = newBirthYear;
    }
    
    set address(newAddress) {
        this._address = newAddress;
    }
    
    toString() {
        return `Person(${this._firstname} ${this._lastname})`;
    }

    peopleInSameCountry(friends) {
        var result = [];
        for(let idx in friends) {
            var friend = friends[idx];
            if(this.address.country === friend.address.country) {
                result.push(friend);
            }
        }
        return result;
    }
}


class Student extends Person {
    constructor(firstname, lastname, ssn, school) {
        super(firstname, lastname, ssn);
        this._school = school;
    }

    get school() {
        return this._school;
    }


    peopleInSameCountryAndSchool(friends) {
        var closeFriends = super.peopleInSameCountry(friends);
        var result = [];
        for(let idx in closeFriends) {
            var friend = closeFriends[idx];
            if(this.school === friend.school) {
                result.push(friend);
            }
        }
        return result;
    }
}



function selector(country, school) {
    return function(student) {
        return student.address.country === country 
            && student.school === school;
    }
}

const findStudentsBy = function(friends, selector) {
    return friends.filter(selector);
}

findStudentsBy(['A', 'B', 'C'], selector('USA', 'MIT'));

function zipCode(code, location) {
    let _code = code;
    let _location = location;

    return {
        code: function () {
            return _code;
        },
        location: function () {
            return _location;
        },
        fromString: function(str) {
            let parts = str.split('-');
            return zipCode(parts[0], parts[1]);
        },
        toString: function() {
            return `${_code}-${_location}`;
        }
    }
}

const princetonZip = zipCode('08544', 'Princeton');
console.log(princetonZip.toString()); // "08544-Princeton"

const newZip = princetonZip.fromString('12345-NewYork');
console.log(newZip.code()); // "12345"
console.log(newZip.location()); // "NewYork"

function coordinate(lat, long) {
    let _lat = lat;
    let _long = long;

    return {
        latitude: function () {
            return _lat;
        },
        longitude: function () {
            return _long;
        },
        translate: function(dx, dy) {
            return coordinate(_lat + dx, _long + dy);
        },
        toString: function() {
            return `(${_lat},${_long})`;
        }
    }
}

const isObject = (val) => val && typeof val === 'object';

function deepFreeze(obj) {
    if(isObject(obj) && !Object.isFrozen(obj)) {
        Object.keys(obj).forEach(name => {
            deepFreeze(obj[name]);
        });
        Object.freeze(obj);
    }
    return obj;
}





function printPropleInTheUs(people) {
    for(let i = 0; i < people.length; i++) {
        var thisPerson = people[i];
        if(thisPerson.address.country === 'USA') {
            console.log(thisPerson);
        }
    }   
}

function printPeople(people, action) {
    for(let i = 0; i < people.length; i++) {
        action(people[i]);
    }
}

var action = function(person) {
    if(person.address.country === 'USA') {
        console.log(person);
    }
}

printPeople(people, action);

function printPeople(people, selector, printer) {
    people.forEach(function (person) {
        if(selector(person)) {
            printer(person);
        }
    })
}

var inUs = person => person.address.country === 'USA';

printPeople(people, inUs, console.log);


function MyType(arg) {
    this.prop = arg;
}

var someValue = new MyType('someValue');
someValue.prop; // 'someValue'


function negate(func) {
    return function() {
        return !func.apply(null, arguments);
    }
}

function isNull(val) {
    return val === null;
}

var isNotNull = negate(isNull);


function makeAddFunction(amount) {
    function add(number) {
        return number + amount;
    }
    return add;
}

function makeExponentFunction(base) {
    function raise (exponent) {
        return Math.pow(base, exponent);
    }
    return raise;
}


var MyModule = (function MyModule(exportParams) {
    let _MyPrivateVar = 0;

    exportParams.method = function () {

    }

    exportParams.method2 = function () {

    }
    
})(MyModule || {});
