import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import { useCallback } from "react";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdx = userAnswers.length;
  const isQuizCompleted = activeQuestionIdx === QUESTIONS.length;

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  const question = QUESTIONS[activeQuestionIdx];
  const shuffledAnswers = [...question.answers]; // make a copy
  shuffledAnswers.sort(() => Math.random() - 0.5); // doesn't return new array, edit existing array; negative return value leads to swap, else stay

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  console.log(userAnswers);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIdx}
          timeout={5000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{question.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((a) => (
            <li key={a} className="answer">
              <button onClick={() => handleSelectAnswer(a)}>{a}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
