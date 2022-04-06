import wordBank from "../res/wordBank.txt";

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\r\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)].trim();
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord };
};

export const isAlpha = ({ key }) => {
  const r = /^[a-zA-Z]{1,1}$/;
  return r.test(key.toLowerCase());
};

export const isBackspace = ({ keyCode }) => keyCode === 8;

export const isEnter = ({ keyCode }) => keyCode === 13;
