import React from "react";
import styled from "styled-components";

const GameOverWrapper = styled.div`
  position: absolute;
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

interface GameOverProps {
  wrongLetters: number;
  underscores: string[];
  persistTheme: string;
  startGame: Function;
  chooseNewTheme: Function;
  word: string;
  gameOver: boolean;
}

const GameOver = ({
  wrongLetters,
  underscores,
  persistTheme,
  startGame,
  chooseNewTheme,
  word,
  gameOver
}: GameOverProps) => {
  return (
    <>
      {gameOver && (
        <GameOverWrapper>
          {wrongLetters >= 10 && (
            <>
              <Results>
                Sorry, you have lost. The correct word was {word.toUpperCase()}
              </Results>
            </>
          )}
          {!underscores.includes("_") && (
            <>
              <Results>
                Good job! You guessed {word.toUpperCase()}!
                {persistTheme === "glam metal bands" && " ROCK ON"}
              </Results>
            </>
          )}
          <PlayAgain onClick={() => startGame(persistTheme)}>
            Play again
          </PlayAgain>
          <button onClick={() => chooseNewTheme()}>Choose New Theme</button>
        </GameOverWrapper>
      )}
    </>
  );
};

export default GameOver;
