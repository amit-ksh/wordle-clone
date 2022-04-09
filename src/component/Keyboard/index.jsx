import "./Keyboard.css";

import Key from "./Key";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const Keyboard = ({ onLetterClick }) => {
  return (
    <>
      {keyboard.map((row, rowNo) => (
        <div className="key-row" id={`row${rowNo + 1}`} key={rowNo}>
          {row.map((key) => (
            <Key keyVal={key} key={key} onLetterClick={onLetterClick} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
