import React, { useState } from 'react';
import { btns } from '../btns';
import Button from './Button';

const removeSpaces = (num: number) => num.toString().replace(/\s/g, '');

type Calculate = {
  sign: string;
  num: number | string;
  res: number | string;
  opString: string;
};

function Calc(): JSX.Element {
  let [calc, setCalc] = useState<Calculate>({
    sign: '',
    num: 0,
    res: 0,
    opString: '',
  });

  const math = (a: number, b: number, sign: string) =>
    sign === '+'
      ? a + b
      : sign === '-'
      ? a - b
      : sign === 'x'
      ? a * b
      : sign === '√'
      ? a
      : sign === '%'
      ? a
      : sign === '/'
      ? a / b
      : b;

  const numClickHandler = (btn: string) => {
    if (removeSpaces(Number(calc.num)).length < 11) {
      setCalc((prev) => ({
        ...calc,
        opString: prev.opString + btn,
        num: calc.num === 0 && btn === '0' ? '0' : calc.num + btn,
        res: !calc.sign ? 0 : Number(calc.res),
      }));
    }
  };

  const doubleZeroClickHandler = () => {
    if (removeSpaces(Number(calc.num)).length < 11) {
      setCalc((prev) => ({
        ...calc,
        opString: calc.num === 0 ? prev.opString : prev.opString + '00',
        num: calc.num === 0 ? '0' : calc.num + '00',
        res: !calc.sign ? 0 : calc.res,
      }));
    }
  };

  const commaClickHandler = () => {
    setCalc((prev) => ({
      ...calc,
      num: !calc.num.toString().includes('.') ? prev.num + '.' : calc.num,
      opString: prev.opString + '.',
      res:
        !calc.res && calc.num
          ? calc.num
          : String(
              math(
                Number(removeSpaces(Number(calc.res))),
                Number(removeSpaces(Number(calc.num))),
                calc.sign,
              ),
            ).slice(0, 14),
    }));
  };

  const signClickHandler = (btn: string) => {
    if (String(calc.num) === '0' && calc.sign === '/') {
      setCalc({
        ...calc,
        sign: '',
        num: 0,
        res: 'Ошибка',
        opString: '',
      });
    } else {
      setCalc((prev) => ({
        ...calc,
        sign: btn,
        res:
          !calc.res && calc.num
            ? Number(calc.num)
            : String(
                math(
                  Number(removeSpaces(Number(calc.res))),
                  Number(removeSpaces(Number(calc.num))),
                  calc.sign,
                ),
              ).slice(0, 14),
        num: 0,
        opString:
          String(Number(prev.opString.slice(-1))) === 'NaN' &&
          prev.opString.slice(-1) !== ')' &&
          prev.opString.slice(-1) !== '%'
            ? prev.opString.slice(0, -1) + btn
            : prev.opString + btn,
      }));
    }
  };

  const squareClickHandler = () => {
    const matchNumber = /\d+$/.exec(calc.opString);
    if (matchNumber) {
      const lastNumber = matchNumber[0];
      setCalc((prev) => ({
        ...calc,
        num: Math.sqrt(Number(prev.num)),
        res: String(
          math(
            Number(removeSpaces(Number(calc.res))),
            Number(removeSpaces(Math.sqrt(Number(prev.num)))),
            calc.sign,
          ),
        ).slice(0, 14),
        sign: '√',
        opString:
          prev.opString.slice(0, -lastNumber.length) +
          String(Math.sqrt(Number(calc.num))).slice(0, 4),
      }));
    }
  };

  const percentClickHandler = () => {
    setCalc((prev) => ({
      ...calc,
      num: (Number(prev.res) * Number(prev.num)) / 100,
      res: String(
        math(
          Number(removeSpaces(Number(calc.res))),
          Number(removeSpaces((Number(prev.res) * Number(prev.num)) / 100)),
          calc.sign,
        ),
      ).slice(0, 14),
      sign: '%',
      opString: prev.opString
        .split('')
        .reverse()
        .join('')
        .replace(
          String(Number(calc.num)).split('').reverse().join(''),
          String((Number(prev.res) * Number(prev.num)) / 100)
            .split('')
            .reverse()
            .join(''),
        )
        .split('')
        .reverse()
        .join(''),
    }));
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
      opString: '',
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          String(calc.num) === '0' && calc.sign === '/'
            ? 'Ошибка'
            : String(
                math(
                  Number(removeSpaces(Number(calc.res))),
                  Number(removeSpaces(Number(calc.num))),
                  calc.sign,
                ),
              ).slice(0, 11),
        sign: '',
        num: 0,
        opString: '',
      });
    }
  };

  const calculate = (btn: string) =>
    btn === 'C'
      ? resetClickHandler()
      : btn === '%'
      ? percentClickHandler()
      : btn === '='
      ? equalsClickHandler()
      : btn === '/' || btn === 'x' || btn === '-' || btn === '+'
      ? signClickHandler(btn)
      : btn === '√'
      ? squareClickHandler()
      : btn === ','
      ? commaClickHandler()
      : btn === '00'
      ? doubleZeroClickHandler()
      : numClickHandler(btn);

  return (
    <div className="calc">
      <div className="output">
        <div className="operations">{calc.opString}</div>
        <div className="result">{calc.res}</div>
      </div>

      <div className="separator"></div>

      <div className="buttons">
        {btns.map((btn: string) => (
          <Button
            key={btn}
            className={btn !== '=' ? 'button' : 'button equal'}
            onClick={() => calculate(btn)}
            value={btn}
          />
        ))}
      </div>
    </div>
  );
}

export default Calc;
