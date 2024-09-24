const calc = require('./calculator');
describe('Calculator', () => {
    it('should return the correct sum of two numbers', () => {
        expect(calc(2, '+', 3)).toBe(5);
    });

    it('Should return the correct difference of two numbers',()=>{
        expect(calc(5, '-', 2)).toBe(3);
    })
    it('should return the correct product of two numbers', () => {
        expect(calc(4, '*', 6)).toBe(24);
    });
    it('should return the correct quotient of two numbers', () => {
        expect(calc(10, '/', 2)).toBe(5);
    });
    it('should throw an error when dividing by zero', () => {
        expect(() => calc(6, '%', 0)).toThrow('Division by zero');
        expect(() => calc(6, '/', 0)).toThrow('Division by zero');
    });

    it('should handle decimal numbers correctly', () => {
        expect(calc(3.5, '*', 2)).toBe(7);
        expect(calc(3.5, '*', 2.2)).toBeCloseTo(7.7);
    });

    it('should return the correct power of two numbers',()=>{
        expect(calc(2,'^',3)).toBe(8);
    });

    it('should return the correct modulo of two numbers',()=>{
        expect(calc(5,'%',2)).toBe(1);
    });

    it('should follow the correct order of operations', () => {
        expect(calc(2, '+', 3, '*', 4)).toBe(14);
    });

    it('should throw an error for an invalid operator', () => {
        expect(() => calc(5, '$', 3)).toThrow('Invalid operator');
    });

    it('should throw an error for invalid input types', () => {
        expect(() => calc('2', '+', 3)).toThrow('Invalid input type');
    });

    it('should follow the correct order of operations', () => {
        expect(calc(2, '^', 3, '*', 4)).toBe(32);
    });

});