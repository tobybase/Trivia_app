import React from 'react';
import { Wrapper, ButtonWrapper } from './QuizCard.styles';

export const QuizCard = ({
  question,
  answers,
  playerAnswer,
  questionNum,
  timeOut,
  noAnswer,
  setNoAnswer,
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
          noAnswer={playerAnswer?.answer === null}
          timeOut={timeOut !== !answer}>
          {console.log(timeOut !== !answer && playerAnswer?.answer === null)}
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
