import { useContext } from "react";

import { GameContext, TIMER_DURATION } from "../../context/GameContext";

import styles from "./TimerProgressBar.module.css";

export const TimerProgressBar = () => {
  const { timer } = useContext(GameContext);
  const progressPercent = (timer * 100) / TIMER_DURATION;

  return (
    <div className={styles.timer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{
            width: `${progressPercent}%`,
            backgroundColor:
              progressPercent < 33 ? "var(--alert)" : "var(--black)",
          }}
        />
      </div>
    </div>
  );
};
