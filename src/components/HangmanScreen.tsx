import React from "react";
import styled from "styled-components";
import Alphabet from "./Alphabet";
// import { GiFruitBowl } from "react-icons/gi";
import RandomizeCategory from "./RandomizeCategory";
import Hint from "./Hint";
import "../index.css";
import { EndGameAnimation } from "../utils/EndGameAnimation";
import GameOver from "./GameOver";
import Underscores from "./Underscores";

interface CategoryButtonProps {
  theme: string;
  randCategoryChosen: string;
  randomCategory: string;
}

const CategoryButton = styled.button<CategoryButtonProps>`
  &:disabled {
    color: ${props =>
      props.randCategoryChosen === props.theme
        ? "steelblue"
        : props.randomCategory === props.theme
        ? "#fff"
        : "#000"};
    background: ${props =>
      props.randCategoryChosen === props.theme
        ? "#fff"
        : props.randomCategory === props.theme
        ? "steelblue"
        : "#fff"};
  }
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  border: ${props =>
    props.randCategoryChosen === props.theme ? "2px solid steelblue" : ""};
  transform: ${props =>
    props.randCategoryChosen === props.theme ? "scale(1.15)" : ""};
  transition: ${props =>
    props.randCategoryChosen === props.theme ? "0.2s" : ""};
`;

interface BackgroundProps {
  gameDone: boolean;
}

const Game = styled.div<BackgroundProps>`
  /* opacity: ${props => props.gameDone && 0.15}; */
  display: ${props => props.gameDone && "none"};
`;

interface HangmanScreenProps {
  guess: Function;
  letters: string[];
  word: string;
  underscores: string;
  wrongLetters: number;
  usedLetters: string[];
  gameOver: boolean;
  startGame: Function;
  gamesPlayed: number;
  theme: string[];
  start: boolean;
  persistTheme: string;
  chooseNewTheme: Function;
  randomize: Function;
  randomCategory: string;
  randCategoryChosen: string;
  counter: number;
  giveHint: Function;
  lettersLeft: number;
  usedHint: boolean;
  wins: number;
  losses: number;
}

const Hangman = ({
  guess,
  letters,
  word,
  underscores,
  wrongLetters,
  usedLetters,
  gameOver,
  startGame,
  gamesPlayed,
  theme,
  start,
  persistTheme,
  chooseNewTheme,
  randomize,
  randomCategory,
  randCategoryChosen,
  counter,
  giveHint,
  lettersLeft,
  usedHint,
  wins,
  losses
}: HangmanScreenProps) => {
  return (
    <div>
      <Game gameDone={gameOver}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Baloo Bhai"
            }}
          >
            Hangman
          </h1>
          <div style={{ fontFamily: "Baloo Bhai" }}>
            {`${persistTheme.charAt(0).toUpperCase()}${persistTheme.slice(1)}`}
          </div>
        </div>
      </Game>

      <GameOver
        wrongLetters={wrongLetters}
        underscores={underscores}
        persistTheme={persistTheme}
        startGame={startGame}
        chooseNewTheme={chooseNewTheme}
        word={word}
        gameOver={gameOver}
      />

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
                    <CategoryButton
                      theme={theme}
                      randCategoryChosen={randCategoryChosen}
                      randomCategory={randomCategory}
                      disabled={counter > 0 ? true : false}
                      onClick={() => startGame(theme)}
                      key={i}
                    >
                      {theme}
                    </CategoryButton>
                  );
                })}
              </div>
              <RandomizeCategory
                randomize={randomize}
                categories={theme}
                counter={counter}
              />
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
            <EndGameAnimation
              wrongLetters={wrongLetters}
              lettersLeft={lettersLeft}
              underscores={underscores}
            />
            <Underscores underscores={underscores} />
            <Alphabet
              margin={0}
              usedLetters={usedLetters}
              letters={letters}
              guess={guess}
              gameOver={gameOver}
              wrongLetters={wrongLetters}
              underscores={underscores}
            />
            <Hint
              giveHint={giveHint}
              word={word}
              wrongLetters={wrongLetters}
              lettersLeft={lettersLeft}
              usedHint={usedHint}
              underscores={underscores}
            />
            {/* {persistTheme === "fruits" && <GiFruitBowl />} */}
            <div>You have {10 - wrongLetters} guesses left</div>
            <div>Used letters: {usedLetters.map(item => item)}</div>
            <div>Games Played: {gamesPlayed}</div>
            <div>wins: {wins}</div>
            <div>losses: {losses}</div>
          </div>
        )}
      </Game>
    </div>
  );
};

export default Hangman;
