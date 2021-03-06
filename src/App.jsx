import { useState, useEffect } from "react";

import "./App.css";
import Keyboard from "./component/Keyboard";
import LetterRow from "./component/LetterRow";
import { generateWordSet, isAlpha, isBackspace, isEnter } from "./lib/words";

const displayModal = (setMsg, msg, ms = 2000) => {
  setMsg(msg);
  setTimeout(() => {
    setMsg("");
  }, ms);
};

function App() {
  const [correctWord, setCorrectWord] = useState("");
  const [curGuess, setCurGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState([]);
  const [wordSet, setWordSet] = useState(new Set());
  const [curAttempt, setCurAttempt] = useState(0);
  const [game, setGame] = useState({
    over: false,
    wordGuessed: false,
  });
  const [invalidMessage, setInvalidMessage] = useState("");
  const totalAttempt = 6;

  const handleLetterDelete = () => {
    setCurGuess((state) => state.slice(0, state.length - 1));
  };

  const handleGuessSubmit = () => {
    if (correctWord.length !== curGuess.length) {
      displayModal(setInvalidMessage, "Not enough letters.");
      return;
    }

    if (!wordSet.has(curGuess)) {
      displayModal(setInvalidMessage, "Not in the word list.");
      return;
    }

    // GAME LOGIC
    if (correctWord === curGuess) {
      setGame((state) => ({ ...state, over: true, wordGuessed: true }));

      displayModal(setInvalidMessage, "Congratulation! You Win.", 5000);
      console.log("You Win!");
    } else if (totalAttempt === curAttempt + 1) {
      setGame((state) => ({ ...state, over: true, wordGuessed: false }));
      displayModal(setInvalidMessage, correctWord.toUpperCase(), 5000);
      console.log("You Lose!");
    }

    // updating game state
    setPrevGuesses((state) => [...state, curGuess]);
    setCurGuess("");
    setCurAttempt((state) => state + 1);
  };

  const updateCurGuess = ({ key }) => {
    if (curGuess.length >= correctWord.length) return;

    setCurGuess((state) => state.concat(key.toLowerCase()));
  };

  const onKeyPress = (e) => {
    if (game.over) return;

    if (isBackspace(e)) {
      handleLetterDelete();
    } else if (isEnter(e)) {
      handleGuessSubmit();
    } else if (isAlpha(e)) {
      updateCurGuess(e);
    }
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", onKeyPress);

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [correctWord, curGuess, prevGuesses, curAttempt]);

  const handleLetterClick = (e) => {
    if (game.over) return;

    const { key } = e.target.dataset;

    if (key === "enter") {
      handleGuessSubmit();
    } else if (key === "delete") {
      handleLetterDelete();
    } else {
      updateCurGuess({ key });
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Wordle</h1>
      </header>

      <main>
        <div id="invalid" className={invalidMessage && "active"}>
          {invalidMessage}
        </div>

        <div className="board">
          {Array(totalAttempt)
            .fill(0)
            .map((_, row) => (
              <LetterRow
                guess={curAttempt === row ? curGuess : prevGuesses[row] || ""}
                guessed={row < curAttempt}
                curAttempt={curAttempt}
                correctWord={correctWord}
                key={row}
              />
            ))}
        </div>

        <div className="keyboard">
          <Keyboard onLetterClick={handleLetterClick} />
        </div>
      </main>
    </div>
  );
}

export default App;
