import React, { useState } from 'react';
import { btns } from '../btns';
import Button from './Button';

function App(): JSX.Element {
  const [operator, setOperator] = useState<string>('');
  const [opString, setOpString] = useState<string>('');
  const [num, setNum] = useState<number | string>(0);
  const [result, setResult] = useState<number | string>(0);

  const resetValue = () => {
    setNum(0);
    setResult(0);
  };

  const getSquare = () => {};

  const getPercent = () => {};

  const doSimpleOperation = (operation: string) => {
    setOperator(operation);
    setResult(!result && num ? num : result);
    setNum(0);
    setOpString((prev) => prev + operation);
  };

  const addComma = () => {
    setNum(!num.toString().includes('.') ? num + '.' : num);
  };

  const addDoubleZero = (doubleZero: string) => {
    if (String(num).length < 16 && num) {
      setNum(Number(num + doubleZero));
      setResult(!operator ? 0 : result);
      setOpString((prev) => prev + doubleZero);
    }
  };

  const getEqual = () => {
    if (operator && num >= 0) {
      const math = (a: number, b: number, operator: string) =>
        operator === '+'
          ? a + b
          : operator === '-'
          ? a - b
          : operator === '×'
          ? a * b
          : a / b;

      setResult(
        num === 0 && operator === '/'
          ? 'Деление на 0!'
          : math(Number(result), Number(num), operator),
      );
      setNum(0);
      setOperator('');
      setOpString('');
    }
  };

  const addNumber = (newNum: string) => {
    if (opString.length < 30) {
      setNum(num === 0 && newNum === '0' ? 0 : Number(num + newNum));
      setResult(!operator ? 0 : result);
      setOpString((prev) => prev + newNum);
    }
  };

  const calculate = (operation: string) => {
    switch (operation) {
      case 'C':
        return resetValue();
      case '√':
        return getSquare();
      case '%':
        return getPercent();
      case '+':
        return doSimpleOperation(operation);
      case '-':
        return doSimpleOperation(operation);
      case '×':
        return doSimpleOperation(operation);
      case '/':
        return doSimpleOperation(operation);
      case ',':
        return addComma();
      case '00':
        return addDoubleZero(operation);
      case '=':
        return getEqual();
      default:
        return addNumber(operation);
    }
  };

  return (
    <div className="main">
      <div className="layout">
        <div className="calc">
          <div className="output">
            <div className="operations">{opString}</div>
            <div className="result">{result}</div>
          </div>

          <div className="separator"></div>

          <div className="buttons">
            {btns.map((btn) => (
              <Button
                key={btn}
                className={btn !== '=' ? 'button' : 'button equal'}
                onClick={() => calculate(btn)}
                value={btn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
