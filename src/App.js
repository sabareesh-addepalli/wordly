import { useState } from "react";
import "./App.css";

export default function App() {
  const WORD = "WORLD";
  const keyboardKeys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "K",
    "L",
    "⌫",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "ENTER",
  ];
  const [wordsTry, setWordsTry] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ""))
  );
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [positionMatchWords, setPositionMatchWords] = useState([]);
  const [matchingWords, setMatchingWords] = useState([]);

  const handleInputKey = (key) => {
    let xpos = currentPosition.x;
    let ypos = currentPosition.y;
    let words = [...wordsTry];
    if (key === "ENTER") {
      return checkword();
    }
    if (key === "⌫") {
      words[currentPosition.x][currentPosition.y - 1] = "";
      ypos -= 1;
    } else {
      if (words[currentPosition.x][currentPosition.y]) return;
      words[currentPosition.x][currentPosition.y] = key;
      if (currentPosition.y !== 4) ypos += 1;
    }
    setWordsTry(words);
    setCurrentPosition({ x: xpos, y: ypos });
  };

  const checkword = () => {
    console.log(wordsTry, currentPosition);
    if (wordsTry[currentPosition.x].includes("")) {
      alert("please fill all words");
      return;
    }
    if (WORD === wordsTry[currentPosition.x].join("")) {
      alert("YOU WON");
      return;
    }
    let posWords = [];
    let matchWords = [];
    wordsTry[currentPosition.x].forEach((el, i) => {
      console.log(el, WORD[i]);
      if (el === WORD[i]) {
        posWords.push(el);

        console.log([...positionMatchWords, el]);
      }
      if (!posWords.includes(el) && WORD.includes(el)) {
        matchWords.push(el);
      }
    });
    setPositionMatchWords([...positionMatchWords, ...posWords]);
    setMatchingWords([...matchingWords, ...matchWords]);
    let xpos = currentPosition.x + 1;
    let ypos = 0;
    setCurrentPosition({ x: xpos, y: ypos });
  };
  return (
    <div className="App">
      <h1>Wordly</h1>
      <div>
        {wordsTry.map((word) => (
          <div className="input-container">
            {word.map((item) => (
              <div
                className={`input ${
                  positionMatchWords.includes(item) && "position-matched"
                }
              ${matchingWords.includes(item) && "word-matched"}
              `}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="keyboard-container">
        {keyboardKeys.map((key) => (
          <div
            onClick={() => handleInputKey(key)}
            className={`key ${
              positionMatchWords.includes(key) && "position-matched"
            }
            ${matchingWords.includes(key) && "word-matched"}
            `}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}
