import "./WordRow.css";

import LetterBox from "../LetterBox";

const WordRow = ({ guess, word, id }) => {
  return (
    <div className="row">
      {Array(word.length)
        .fill(0)
        .map((l, i) => (
          <LetterBox letter={guess[i]} word={word} key={`${id}${i}`} />
        ))}
    </div>
  );
};

export default WordRow;
