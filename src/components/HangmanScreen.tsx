import React from "react";
import styled from "styled-components";
import Alphabet from "./Alphabet";
// import { GiFruitBowl } from "react-icons/gi";

const GameOverWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
`;

const PlayAgain = styled.button`
  width: 100px;
  height: 50px;
  background: #234;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  margin: 10px;
`;

const Results = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

interface BackgroundProps {
  gameDone: boolean;
}

const Game = styled.div<BackgroundProps>`
  opacity: ${props => props.gameDone === true && 0.15};
`;

interface HangmanScreenProps {
  guess: Function;
  letters: string[];
  word: string;
  underscores: string;
  guessCount: number;
  usedLetters: string[];
  gameOver: boolean;
  startGame: Function;
  gamesPlayed: number;
  theme: string[];
  start: boolean;
  persistTheme: string;
  chooseNewTheme: Function;
}

const Hangman = ({
  guess,
  letters,
  word,
  underscores,
  guessCount,
  usedLetters,
  gameOver,
  startGame,
  gamesPlayed,
  theme,
  start,
  persistTheme,
  chooseNewTheme
}: HangmanScreenProps) => {
  return (
    <>
      <Game gameDone={gameOver}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            Hangman
          </h1>
          {/* {start && (
            <div style={{ position: "absolute", top: 43.5, left: "60%" }}>
              {persistTheme}
              {persistTheme === "fruits" && <GiFruitBowl />}
            </div>
          )} */}
        </div>
      </Game>

      {gameOver && (
        <GameOverWrapper>
          {guessCount >= 10 && (
            <Results>
              Sorry, you have lost. The correct word was {word.toUpperCase()}
            </Results>
          )}
          {underscores.indexOf("_") < 0 && (
            <Results>
              Good job! You guessed {word.toUpperCase()}!
              {persistTheme === "glam metal bands" && " ROCK ON"}
            </Results>
          )}
          <PlayAgain onClick={() => startGame(persistTheme)}>
            Play again
          </PlayAgain>
          <button onClick={() => chooseNewTheme()}>Choose New Theme</button>
        </GameOverWrapper>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        {!start && (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignSelf: "center" }}>
                Choose a theme
              </div>
              <div style={{ display: "flex" }}>
                {theme.map((theme: string, i: number) => {
                  return (
                    <button
                      style={{
                        margin: "10px",
                        padding: "10px",
                        cursor: "pointer"
                      }}
                      onClick={() => startGame(theme)}
                      key={i}
                    >
                      {theme}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Game gameDone={gameOver}>
        {start && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ letterSpacing: "1rem" }}>{underscores}</div>
            <Alphabet
              margin={50}
              usedLetters={usedLetters}
              letters={letters}
              guess={guess}
              gameOver={gameOver}
            />
            <div>You have {10 - guessCount} guesses left</div>
            <div>Used letters: {usedLetters.map(item => item)}</div>
            <div>Games Played: {gamesPlayed}</div>
          </div>
        )}
      </Game>
    </>
  );
};

export default Hangman;
