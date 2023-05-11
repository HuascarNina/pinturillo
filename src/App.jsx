import { useContext } from "react";

import { GameContext, MAX_LEVELS, TIMER_DURATION } from "./context/GameContext";

import { UserCard } from "./components/UserCard";
import { CharsInput } from "./components/CharsInput";
import { TimerProgressBar } from "./components/TimerProgressBar";
import { LifesCounter } from "./components/LifesCounter";

import { scoreboard } from "./utils/scoreboard";

export const App = () => {
  const { currentLevel, isWinnerLevel, startLevel, winLevel } =
    useContext(GameContext);

  return (
    <>
      <LifesCounter />

      <div className="main-grid">
        <div className="col-users">
          <UserCard />
        </div>

        {currentLevel ? (
          <div className="col-msgs">
            <div className="msgs">
              {isWinnerLevel ? (
                <p className="alert alert-success">¡Adivinaste la palabra!</p>
              ) : (
                <p className="alert">{currentLevel.message}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="col-msgs">
            <div className="msgs">
              <p className="alert">☝️ Ingresa tu username</p>
            </div>
          </div>
        )}

        <div className="col-image">
          {currentLevel ? (
            <img className="main-img" src={currentLevel.image} alt="Image" />
          ) : (
            <div className="main-menu">
              <h2>🖼️ Pinturillo</h2>
              <p>Ingresa tu nombre de usuario, las reglas son simples:</p>

              <div className="rules" style={{ textAlign: "start" }}>
                <p>1. Tienes 3 vidas</p>
                <p>
                  2. Tienes {TIMER_DURATION} segundos para adivinar la imagen
                </p>
                <p>3. Tienes que adivinar {MAX_LEVELS} imágenes para ganar</p>
              </div>

              {/* ScoreBoard */}
              <div className="scoreboard">
                <h3>📊 Scoreboard</h3>
                {scoreboard.scores.length > 0 ? (
                  <table
                    border={1}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Time</th>
                        <th>Levels</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoreboard.scores.map((score, idx) => (
                        <tr key={idx}>
                          <td>{score.username}</td>
                          <td>{score.time}</td>
                          <td>{score.levels.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Aun no hay ganadores 😢</p>
                )}
              </div>

              <button className="btn " onClick={startLevel}>
                Comenzar
              </button>
            </div>
          )}
        </div>

        {currentLevel ? (
          <>
            <div className="col-letters">
              <CharsInput title={currentLevel.title} winGame={winLevel} />
            </div>
          </>
        ) : null}
      </div>

      <TimerProgressBar />
    </>
  );
};
