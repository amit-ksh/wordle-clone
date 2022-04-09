import "./Key.css";

const Key = ({ keyVal, onLetterClick }) => {
  return (
    <button className="key" data-key={keyVal} onClick={onLetterClick}>
      {keyVal}
    </button>
  );
};

export default Key;
