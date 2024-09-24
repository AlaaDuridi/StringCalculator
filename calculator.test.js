const calc = require('./calculator');
describe('Calculator', () => {
    it('should return the correct sum of two numbers', () => {
        expect(calc(2, '+', 3)).toBe(5);
    });
});