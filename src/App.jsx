import { useState } from "react";
import "./App.css";
import WordRow from "./component/WordRow";

function App() {
  const [word, setWord] = useState("hello");
  const [guesses, setGuesses] = useState(["hellw", "he", "", "", ""]);
  const totalGuess = 5;

  return (
    <div className="App">
      <header>
        <h1>Wordle</h1>
      </header>

      <main>
        {Array(totalGuess)
          .fill(0)
          .map((_, i) => (
            <WordRow guess={guesses[i]} word={word} key={i} />
          ))}
      </main>
    </div>
  );
}

export default App;
