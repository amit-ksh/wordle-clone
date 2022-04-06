import { useState, useEffect } from "react";
import "./App.css";
import LetterRow from "./component/LetterRow";

const isAlpha = (s) => {
  const r = /^[a-zA-Z]{1,1}$/;
  return r.test(s);
};

const isBackspace = ({ keyCode }) => keyCode === 8;
const isEnter = ({ keyCode }) => keyCode === 13;

function App() {
  const [correctWord, setCorrectWord] = useState("hello");
  const [curGuess, setCurGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState([]);
  const [curAttempt, setCurAttempt] = useState(0);
  const [game, setGame] = useState({
    over: false,
    wordGuessed: false,
  });
  const totalAttempt = 6;

  const onKeyPress = (e) => {
    if (game.over) return;

    const key = e.key.toLowerCase();

    if (isBackspace(e)) {
      setCurGuess((state) => state.slice(0, state.length - 1));
    } else if (isEnter(e)) {
      if (correctWord.length !== curGuess.length) return;

      // GAME LOGIC
      if (correctWord === curGuess) {
        setGame((state) => ({ ...state, over: true, wordGuessed: true }));
        console.log("You Win!");
      } else if (totalAttempt === curAttempt + 1) {
        setGame((state) => ({ ...state, over: true, wordGuessed: false }));
        console.log("You Lose!");
      }

      // updating game state
      setPrevGuesses((state) => [...state, curGuess]);
      setCurGuess("");
      setCurAttempt((state) => state + 1);
    } else if (isAlpha(key)) {
      if (curGuess.length >= correctWord.length) return;

      setCurGuess((state) => state.concat(key));
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", onKeyPress);

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [curGuess, prevGuesses, curAttempt]);

  return (
    <div className="App">
      <header>
        <h1>Wordle</h1>
      </header>

      <main>
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

        <h2 className="message">
          {game.over ? (game.wordGuessed ? "You Win!" : "You Lose!") : ""}
        </h2>
      </main>
    </div>
  );
}

export default App;
