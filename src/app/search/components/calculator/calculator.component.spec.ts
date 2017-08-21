import { Calculator } from "./calculator.component";

describe('Test for calculator', () => {
    describe('Test for multiply', () => {

        it('Should return nine', () => {
            //Arrange - Preparar
            let calculadora = new Calculator();
            //Act - Actuar
            let resultado = calculadora.multiply(3,3);
            //Asert - Verificar
            expect(resultado).toEqual(9);
        }); 

        it('Should return five', () => {
            //Arrange - Preparar
            let calculadora = new Calculator();
            //Act - Actuar
            let resultado = calculadora.multiply(1,5);
            //Asert - Verificar
            expect(resultado).toEqual(6);
    });
});
});
