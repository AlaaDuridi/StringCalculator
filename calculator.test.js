const calc = require('./calculator');
describe('Calculator', () => {
    it('should return the correct sum of two numbers', () => {
        expect(calc(2, '+', 3)).toBe(5);
    });

    it('Should return the correct difference of two numbers',()=>{
        expect(calc(5, '-', 2)).toBe(3);
    })
});