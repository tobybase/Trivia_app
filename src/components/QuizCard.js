import React from 'react';
import { Wrapper, ButtonWrapper } from './QuizCard.styles';

export const QuizCard = ({
  question,
  answers,
  playerAnswer,
  questionNum,
  timeOut,
  callBack,
}) => (
  <Wrapper>
    <p>Question: {questionNum}</p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={playerAnswer?.correctAnswer === answer}
          playerClicked={playerAnswer?.answer === answer}
          timeOut={playerAnswer?.answer === timeOut}>
          <button
            disabled={playerAnswer ? true : false}
            value={answer}
            onClick={callBack}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);
