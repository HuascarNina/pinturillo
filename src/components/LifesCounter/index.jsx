import { useContext } from "react";

import { GameContext } from "../../context/GameContext";

import styles from "./LifesCounter.module.css";

export const LifesCounter = () => {
  const { lifes } = useContext(GameContext);

  return (
    <div className={styles.lifes}>
      {new Array(lifes).fill(0).map((_, index) => (
        <span key={index} role="img" aria-label="heart">
          ❤️
        </span>
      ))}
    </div>
  );
};
