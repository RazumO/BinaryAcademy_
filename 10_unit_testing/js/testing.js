describe('Testing of object - student', function () {
	it("Checking for existence of proper properties.", function() {
    	expect(student.name).toBeDefined();
    	expect(student.age).toBeDefined();
    	expect(student.live).toBeDefined();
    	expect(student.study).toBeDefined();
  	});
  	it("Checking that properties have proper values.", function() {
    	expect(student.name).toBe('Vadik');
    	expect(student.age).toBe(22);
  	});
  	it("Checking function duckType with argument - student.", function() {
    	expect(duckType(student)).toBe('Student')
  	});
});

describe('Testing of object - man', function () {
	it("Checking for existence of proper properties.", function() {
    	expect(man.name).toBeDefined();
    	expect(man.age).toBeDefined();
    	expect(man.live).toBeDefined();
  	});
  	it("Checking that properties have proper values.", function() {
    	expect(man.name).toBe('Vadik');
    	expect(man.age).toBe(22);
  	});
  	it("Checking function duckType with argument - man.", function() {
    	expect(duckType(man)).toBe('Man')
  	});
});

describe('Testing of object - professor', function () {
	it("Checking for existence of proper properties.", function() {
    	expect(professor.name).toBeDefined();
    	expect(professor.age).toBeDefined();
    	expect(professor.live).toBeDefined();
  	});
  	it("Checking that properties have proper values.", function() {
    	expect(professor.name).toBe('Petro Ivanovych Kostrobiy');
    	expect(professor.age).toBe(61);
  	});
  	it("Checking function professor.checkStudentsKnowledge.", function() {
    	expect(professor.checkStudentsKnowledge(49)).toMatch(/49 - коміссія/);
    	expect(professor.checkStudentsKnowledge(50)).toMatch(/50 - задовільно/);
    	expect(professor.checkStudentsKnowledge(71)).toMatch(/71 - добре/);
    	expect(professor.checkStudentsKnowledge(88)).toMatch(/88 - відмінно/);
  	});
  	it("Checking out of rage values of argument of function professor.checkStudentsKnowledge.", function() {
    	expect(professor.checkStudentsKnowledge(-10)).toMatch(/0 - коміссія/);
    	expect(professor.checkStudentsKnowledge(9999999)).toMatch(/100 - відмінно/);
  	});
  	it("Checking exceptions in function professor.checkStudentsKnowledge.", function() {
    	expect(professor.checkStudentsKnowledge.bind(null, -5)).toThrow();
    	expect(professor.checkStudentsKnowledge.bind(null, 9999999999999)).toThrow();
  	});

});


