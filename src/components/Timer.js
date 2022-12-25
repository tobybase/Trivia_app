import React from 'react';
import { useEffect, useState } from 'react';
import { Wrapper } from './Timer.styles';

export const Timer = ({ setTimeOut, questionNum }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(3);
  }, [questionNum]);

  return (
    <Wrapper>
      <p>{timer}</p>
    </Wrapper>
  );
};
