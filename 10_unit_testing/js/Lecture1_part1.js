var Man = function( _name, _age) {
  this.name = _name;
  this.age = _age;
  this.live = function() {
    console.log( this.name + ', never give up!');
    return this;
  }
}

var Student = function( _name, _age) {
  this.study = function() {
    console.log("I wonna become a magiser of scince! P.S. student " + this.name);
    return this;
  }
  Man.apply(this, arguments);
}

Student.prototype = new Man();

var student = new Student('Vadik', 22);
var man = new Man('Vadik', 22);

function duckType( someObj) {
  var manObj = new Man();
  var studObj = new Student();
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
  var manObj = new Man();
  var studObj = new Student();
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

var Professor = function( _name, _age) {
  this.checkStudentsKnowledge = function(studentsKnowledge) {
    var mark = '';
    try {
      if(studentsKnowledge < 0 || studentsKnowledge > 100) {
        throw new Error("Knowledge out of range!");
      }
      if (studentsKnowledge < 50) {
        mark = "коміссія";
      } else if (studentsKnowledge < 71) {
        mark = "задовільно";
      } else if (studentsKnowledge < 88) {
        mark = "добре";
      } else {
        mark = "відмінно"
      }
      return studentsKnowledge + ' - ' + mark;
    } catch (err) {
      if (studentsKnowledge < 0) {
        studentsKnowledge = 0;
      } else {
        studentsKnowledge = 100;
      }
      console.log(err.message + ' ' + 'Value was given to the right automatically.');
      return this.checkStudentsKnowledge(studentsKnowledge);
    }
  }
  Man.apply(this, arguments);
}

Professor.prototype = new Man();

 var professor = new Professor("Petro Ivanovych Kostrobiy", 61);
 console.log(professor.checkStudentsKnowledge(-100));