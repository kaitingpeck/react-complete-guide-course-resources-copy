import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import { useCallback } from "react";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdx =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizCompleted = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIdx].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState(""); // reset answer state
        }, 2000);
      }, 1000);
    },
    [activeQuestionIdx]
  ); // re-create function whenever activeQuestionIdx changes

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  const question = QUESTIONS[activeQuestionIdx];

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        questionText={question.text}
        answers={question.answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
