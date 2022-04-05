import "./WordRow.css";

import LetterBox from "../LetterBox";

const WordRow = ({ curAttempt, correctWord, guess, id }) => {
  return (
    <div className="row">
      {Array(correctWord.length)
        .fill(0)
        .map((l, i) => (
          <LetterBox
            letter={guess[i]}
            correctWord={correctWord}
            key={`${id}${i}`}
          />
        ))}
    </div>
  );
};

export default WordRow;
