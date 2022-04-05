import "./LetterBox.css";

import { useState, useEffect } from "react";

const LetterBox = ({ correctWord, letter, guess, guessed }) => {
  const [variants, setVariants] = useState("col");

  useEffect(() => {
    if (guessed) {
      const pos = correctWord.indexOf(letter);

      if (pos !== -1) {
        if (guess[pos] === correctWord[pos]) {
          // position of letter is correct
          setVariants((state) => state.concat(" correct"));
        } else {
          // position of letter is incorrect
          setVariants((state) => state.concat(" present"));
        }
      } else {
        // letter is absent from correct word
        setVariants((state) => state.concat(" absent"));
      }
    }
  }, [guessed]);

  return <div className={variants}>{letter}</div>;
};

export default LetterBox;
