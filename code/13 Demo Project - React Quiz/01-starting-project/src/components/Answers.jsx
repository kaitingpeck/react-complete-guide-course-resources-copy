import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]; // make a copy
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((a) => {
        const selected = selectedAnswer === a;
        let cssClass = "";

        if (selected && answerState === "answered") {
          cssClass = "selected";
        } else if (
          selected &&
          (answerState === "correct" || answerState === "wrong")
        ) {
          cssClass = answerState;
        }

        return (
          <li key={a} className="answer">
            <button
              onClick={() => onSelect(a)}
              className={cssClass}
              disabled={answerState !== ""} // already answered, don't want to allow selecting again yet before deciding if right or wrong
            >
              {a}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
