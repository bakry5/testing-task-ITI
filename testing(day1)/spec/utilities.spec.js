const { random, removeDuplicates } = require('../utilities');

describe("Testing Math Utility Functions (Problem 1)", () => {
    
   
    it("test that the return value is a number", () => {
       
        expect(typeof random(1, 10)).toBe("number");
    });

   
    it("test if we pass 5,7 it will return a number >= 5 and <= 7", () => {
        const result = random(5, 7);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(7);
    });

    it("test if we pass 3 it will return NaN", () => {
       
        expect(random(3)).toBeNaN();
    });
});












describe("Testing Array Utility Functions (Problem 2)", () => {
    const input = [1, 2, 2, 3, 4,3, 4, 5];

    
    it("test that the returned type is array", () => {
        const result = removeDuplicates(input);
        expect(Array.isArray(result)).toBe(true);
    });

    
    it("test that returned array length is correct", () => {
        const result = removeDuplicates(input); 
        expect(result.length).toBe(5);
    });

   
    it("test that array have unique elements", () => {
        const result = removeDuplicates([5, 5, 5, 5]);
      
        expect(result.length).toBe(1);
    });
});