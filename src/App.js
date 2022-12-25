import { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { QuizCard } from './components/QuizCard';
import { GlobalStyle, Wrapper } from './App.styles';
import { Timer } from './components/Timer';

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [noAnswer, setNoAnswer] = useState(false);

  const initiateTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions();

    setQuestions(newQuestions);
    setPlayerAnswers([]);
    setNumber(0);
    setCorrect(0);
    setWrong(0);
    setLoading(false);
  };

  const checkAnswer = (event) => {
    if (!gameOver) {
      //playerAnswer
      const answer = event.currentTarget.value;
      //checking answer is coorrect or not
      const correct = questions[number].correct_answer === answer;
      //Did not answer
      const noAnswer = event.currentTarget.value === null;
      // Add score if answer is correct
      if (correct) setCorrect((prev) => prev + 1);
      if (!correct) setWrong((prev) => prev + 1);
      if (timeOut) setWrong((prev) => prev + 1);

      const answerObj = {
        question: questions[number].questions,
        answer,
        correct,
        noAnswer,
        correctAnswer: questions[number].correct_answer,
      };

      setPlayerAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === questions.length) {
      gameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>HAVE A QUIZE DAY</h1>
        {gameOver || playerAnswers.length === questions.length ? (
          <button className='start' onClick={initiateTrivia}>
            start
          </button>
        ) : null}
        {!gameOver ? (
          <p className='score'>
            Score: {correct} / {wrong}
          </p>
        ) : null}
        {loading && <p>Loading question . . .</p>}
        {!loading && !gameOver && (
          <Timer setTimeOut={setTimeOut} questionNum={number + 1} />
        )}
        {!loading && !gameOver && (
          <QuizCard
            questionNum={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            playerAnswer={playerAnswers ? playerAnswers[number] : undefined}
            noAnswer={noAnswer}
            callBack={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        playerAnswers.length === number + 1 &&
        number !== questions.length - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
