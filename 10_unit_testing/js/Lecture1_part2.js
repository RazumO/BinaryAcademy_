var Man = {
  constructor: function( _name, _age) {
    this.name = _name;
    this.age = _age;
    this.live = function() {
      console.log( this.name + ', never give up!');
      return this;
    }
    return this;
  }
};

var Student = Object.create(Man);

Student.constructor = function( _name, _age) {
  this.study = function() {
    console.log("I wonna become a magiser of scince! P.S. student " + this.name);
    return this;
  }
  
  Man.constructor.apply(this, arguments);
  return this;
}

var student = Object.create(Student).constructor("Vadik", 22);
console.log(student);
var man = Object.create(Man).constructor("Vadik", 22);

function duckType( someObj) {
  var manObj = Object.create(Man).constructor();
  var studObj = Object.create(Student).constructor();
  if (checkObj(manObj, someObj)) {
    if (checkObj(studObj, someObj)) {
      return "Student";
    } else {
      return "Man";
    }
  } else return "";
}

function checkObj( firstObj, secObj) {
  keys = Object.keys(firstObj);
  for (prop in keys) {
    if (keys[prop] in secObj);
    else {
      return false;
    }
  }
  return true;
}

console.log(duckType(man));
console.log(duckType(student));

function duckType2() {
  var manObj = Object.create(Man).constructor();
  var studObj = Object.create(Student).constructor();
  if (checkObj(manObj, this)) {
    if (checkObj(studObj, this)) {
      return "Student";
    } else {
      return "Man";
    }
  } else return "";
}

console.log(duckType2.call(man));
console.log(duckType2.apply(student));