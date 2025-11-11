let enrollment = [
  { enrolled: 2, grade: 100 },
  { enrolled: 2, grade: 80 },
  { enrolled: 1, grade: 89 },
];


var totalGrades = 0;
var totalStudentsFound = 0;

for(let i = 0; i < enrollment.length; i++) {
    let student = enrollment[i];
    if(student !== null) {
        if(student.enrolled > 1) {
            totalGrades += student.grade;
            totalStudentsFound++;
        }
    }
}

_.chain(enrollment)
    .filter(student => student.enrolled > 1)
    .pluck('grade')
    .average()
    .value()


var valid = false;
var elem = document.querySelector('#student-ssn');

elem.onkeyup = function(event) {
    var val = elem.value;
    if(val !== null && val.length !== 0) {
        val = val.replace(/^\s*|\s*$|\-s/g, '');
        if(val.length === 9) {
            console.log(`Vaild SSN: ${val}!`);
            valid = true;
        }
    } else {
        console.log(`Invalid SSN: ${val}!`);
    }
}



Rx.Observable.formatEvent(document.querySelector('#student-ssn'), 'keyup')
    .map(input => input.srcElement.value)
    .filter(ssn => ssn !== null && ssn.length !== 0)
    .map(ssn => ssn.replace(/^\s*|\s*$|\-s/g, ''))
    .skipWhile(ssn => ssn.length !== 9)
    .subscribe(validSsn => console.log(`Valid SSN ${validSsn}`))