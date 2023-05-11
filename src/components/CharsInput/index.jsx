import { useState, useEffect, useRef, createRef, useContext } from "react";

import styles from "./CharsInput.module.css";
import { GameContext } from "../../context/GameContext";

export const CharsInput = ({ winGame }) => {
  const { currentLevel, isPlaying } = useContext(GameContext);

  const title = currentLevel?.title || "";
  const movieTitleChars = title.split("");
  const inputRefs = useRef([]);
  const [inputValues, setInputValues] = useState(
    new Array(title.length).fill("")
  );

  // Efecto para limpiar los inputs cuando se cambia de nivel
  useEffect(() => {
    setInputValues(new Array(title.length).fill(""));
    return () => {
      inputRefs.current = [];
    };
  }, [title]);

  // Efecto para detectar si el usuario adivinó la palabra
  useEffect(() => {
    const resp = inputValues.join("").toLowerCase().trim();
    const titleLowerCase = title.toLowerCase();

    if (resp === titleLowerCase) {
      winGame();
    }
  }, [inputValues]);

  const onChangeKeyInput = (event, idx) => {
    const newInputValues = [...inputValues];
    newInputValues[idx] = event.target.value.slice(-1);
    setInputValues(newInputValues);

    if (idx === inputValues.length - 1) return;
    if (event.nativeEvent.inputType === "deleteContentBackward") return;

    inputRefs.current[idx + 1].current.focus();
  };

  const onKeyDown = (event, idx) => {
    if (event.key !== "Backspace") return;
    if (idx === 0) return;

    setTimeout(() => {
      inputRefs.current[idx - 1].current.focus();
    }, 0);
  };

  return (
    <div className={styles.charactersContainer}>
      {movieTitleChars.map((item, idx) => {
        const inputRef = inputRefs.current[idx] || createRef();
        inputRefs.current[idx] = inputRef;

        return (
          <input
            key={item + idx}
            className={styles.char}
            autoFocus={idx === 0}
            ref={inputRef}
            type="text"
            disabled={!isPlaying}
            value={inputValues[idx]}
            onChange={(ev) => onChangeKeyInput(ev, idx)}
            onKeyDown={(ev) => onKeyDown(ev, idx)}
          />
        );
      })}
    </div>
  );
};
