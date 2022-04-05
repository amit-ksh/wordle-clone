import "./WordRow.css";

import LetterBox from "../LetterBox";

const WordRow = ({ correctWord, guess, guessed, id }) => {
  return (
    <div className="row">
      {Array(correctWord.length)
        .fill(0)
        .map((l, i) => (
          <LetterBox
            letter={guess[i]}
            guessed={guessed}
            guess={guess}
            correctWord={correctWord}
            key={`${id}${i}`}
            index={i}
          />
        ))}
    </div>
  );
};

export default WordRow;
