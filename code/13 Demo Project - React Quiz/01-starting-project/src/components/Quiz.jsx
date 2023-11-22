import { useState } from "react";
import QUESTIONS from "../questions.js";
import { useCallback } from "react";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdx = userAnswers.length;
  const isQuizCompleted = activeQuestionIdx === QUESTIONS.length;

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

  if (isQuizCompleted) {
    return <Summary answers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        index={activeQuestionIdx} // key prop is reserved by React, so we need our own prop to access it
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
