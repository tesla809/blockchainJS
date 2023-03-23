// old vs new way to create Classes

// Overview of constructor old school method
// helps create new instances
function User(_firstName, _lastName, _age, _gender) {
  this.firstName = _firstName;
  this.lastName = _lastName;
  this.age = _age;
  this.gender = _gender;
}

// prototype object via old school method
// object that holds data and methods which class instances share
// helps to instances to share methods 
// instead of each having identical copies

// shared by all instances of user
User.prototype.emailDomain = '@hooli.com';

// getEmailMethod
User.prototype.getEmailAddress = function() {
  return this.firstName + '.' + this.lastName + this.emailDomain; 
}

const alice = new User('Alice', 'Anderson', 27, 'Female');
const bob = new User('Bob', 'Benjamin', 42, 'Male');

console.log('Using ES5 function as constructor');
console.log(alice);
console.log(bob);

// log out prototype objects
console.log(alice.__proto__); 
console.log('alice email: ', alice.getEmailAddress()); 

// using class and constructor syntax sugar
class Player {
  constructor(_firstName, _lastName, _age, _gender) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.age = _age;
    this.gender = _gender;
    this.emailDomain = '@hooli.com'; // add to all class Player
  }

  // getEmailAddress method
  getEmailAddress() {
    return this.firstName + '.' + this.lastName + this.emailDomain;
  }
}

const anthony = new Player('Anthony', 'Albertorio', 36, 'Male');
const chiara = new Player('Chiara', 'Curci', 32, 'Female');

console.log('Using ES6 class and constructor()');
console.log(anthony); // emailDomain found here
console.log(chiara);

// see values of properties and method added to class 
console.log(anthony.emailDomain);
console.log(anthony.getEmailAddress());