import { createContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";

import { getRandomIdx } from "../utils/random";
import { sleep } from "../utils/time";

import levelsData from "../assets/data.json";
import { scoreboard } from "../utils/scoreboard";

export const TIMER_DURATION = 8;
export const MAX_LEVELS = 3;

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [lifes, setLifes] = useState(3);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [gameTime, setGameTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [winCount, setWinCount] = useState(0);
  const [isWinnerLevel, setIsWinnerLevel] = useState(false);

  const [levels, setLevels] = useState(levelsData);
  const [lostLevels, setLostLevels] = useState([]);
  const [wonLevels, setWonLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);

  const [username, setUsername] = useState("Jhon Doe");

  // Update playing time every second
  useEffect(() => {
    if (!isPlaying) return;
    if (winCount === 3) return;

    const intervalId = setInterval(() => {
      setGameTime(gameTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameTime, isPlaying]);

  // Update timer every second
  useEffect(() => {
    if (!isPlaying) return;
    if (timer === 0) {
      fail();
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, timer]);

  // End game
  useEffect(() => {
    if (lifes !== 0) return;
    alert("You lose!");
    setIsPlaying(false);
  }, [lifes]);

  // Win game
  useEffect(() => {
    if (winCount === 3) {
      alert("You win!");
      setIsPlaying(false);
      scoreboard.set({
        time: gameTime,
        levels: wonLevels,
        username,
      });
    }
  }, [winCount]);

  const startLevel = () => {
    setIsPlaying(true);
    setTimer(TIMER_DURATION);

    const randomIdx = getRandomIdx(levels);
    setCurrentLevel(levels[randomIdx]);
    setLevels(levels.filter((level) => level.id !== levels[randomIdx].id));
  };

  const winLevel = async () => {
    confetti({
      particleCount: 750,
      spread: 300,
      angle: 60,
    });

    setWonLevels([...wonLevels, currentLevel]);

    setIsPlaying(false);
    setIsWinnerLevel(true);
    setWinCount(winCount + 1);
    await sleep(1000);
    nextLevel();
  };

  const nextLevel = () => {
    setIsWinnerLevel(false);
    if (levels.length === 0) return;
    if (wonLevels.length === MAX_LEVELS - 1) return;

    startLevel();
  };

  const fail = () => {
    setLifes(lifes - 1);
    setTimer(TIMER_DURATION);
    setLostLevels([...lostLevels, currentLevel]);
    startLevel();
  };

  return (
    <GameContext.Provider
      value={{
        lifes,
        timer,
        gameTime,
        isWinnerLevel,
        currentLevel,
        lostLevels,
        wonLevels,
        isPlaying,
        username,
        setUsername,
        startLevel,
        winLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
