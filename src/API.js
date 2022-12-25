import { shuffleArray } from './util';

export const fetchQuizQuestions = async () => {
  const endPoint = `https://opentdb.com/api.php?amount=50&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
