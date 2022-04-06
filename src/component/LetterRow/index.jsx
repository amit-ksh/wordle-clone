import "./LetterRow.css";

import LetterBox from "../LetterBox";

const LetterRow = ({ correctWord, guess, guessed, id }) => {
  return (
    <div className="row">
      {Array(correctWord.length)
        .fill(0)
        .map((l, i) => (
          <LetterBox
            letter={guess[i]}
            guessed={guessed}
            correctWord={correctWord}
            key={`${id}${i}`}
            index={i}
          />
        ))}
    </div>
  );
};

export default LetterRow;
