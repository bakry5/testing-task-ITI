const Employee = require('../Employee');

describe("Employee Class", () => {
    let emp;


    beforeEach(() => {
        emp = new Employee("Bakry", 25, 3);
    });

    describe("calculateSalary", () => {
        it("should set salary to 5000 if yearsOfExp is 5 or less", () => {
            emp.calculateSalary();
            expect(emp.salary).toBe(5000);
        });

        it("should set salary to 9000 if yearsOfExp is more than 5", () => {
            emp.yearsOfExp = 6;
            emp.calculateSalary();
            expect(emp.salary).toBe(9000);
        });
    });

    describe("setSkills", () => {
        it("should set the skills correctly and return them", () => {
            const skills = ["JavaScript", "React", "Node.js"];
            const result = emp.setSkills(...skills);
            
            expect(emp.skills).toEqual(skills);
            expect(result).toContain("React");
            expect(result.length).toBe(3);
        });
    });

    describe("requestTimeOff (Testing with Spies)", () => {
        let hrSystemSpy;

        beforeEach(() => {
            
            hrSystemSpy = {
                validateDays: jasmine.createSpy("validateDays"),
                submitRequest: jasmine.createSpy("submitRequest")
            };
        });

        it("should return denied message if validateDays returns false", () => {
       
            hrSystemSpy.validateDays.and.returnValue(false);

            const result = emp.requestTimeOff(10, hrSystemSpy);

            expect(result).toBe("Time off request denied: invalid number of days.");
     
            expect(hrSystemSpy.validateDays).toHaveBeenCalledWith(10); 
       
            expect(hrSystemSpy.submitRequest).not.toHaveBeenCalled();
        });

        it("should return success message and call submitRequest if validateDays returns true", () => {
            hrSystemSpy.validateDays.and.returnValue(true);

            const result = emp.requestTimeOff(5, hrSystemSpy);

            expect(result).toBe("Time off request submitted successfully");
            expect(hrSystemSpy.submitRequest).toHaveBeenCalledWith("Bakry", 5);
        });
    });
});