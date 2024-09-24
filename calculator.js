function calc (a, operator, b){
    switch(operator){
        case '+':
            return a+b;
        case '-':
            return a-b;
        case '*':
            return a*b;
        case '/':
            if(b===0){
                throw new Error('Division by zero');
            }
            return a/b;
    }
}
module.exports=calc;