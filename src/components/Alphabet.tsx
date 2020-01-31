import React from "react";
import letters from "../variables/letters";
import styled from "styled-components";
import Column from "./Column";

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  letter-spacing: 1rem;
`;

const ButtonStyles = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin: 5px;
  :focus {
    outline: none;
  }
  :disabled {
    color: #ccc;
    background: steelblue;
  }
  color: steelblue;
  font-weight: bold;
  text-transform: uppercase;
`;

const BorderRadius = {
  borderRadius: "20px"
};

interface AlphabetProps {
  guess: Function;
  letters: string[];
  usedLetters: string[];
  gameOver: boolean;
  margin: number;
  wrongLetters: number;
  underscores: string;
}

const Alphabet = ({
  guess,
  usedLetters,
  gameOver,
  margin,
  wrongLetters,
  underscores
}: AlphabetProps) => {
  return (
    <>
      <LetterContainer style={{ width: "400px", margin: margin }}>
        <Column size="xs-3 sm-3 md-3">
          {letters.map((letter, i) => {
            return (
              <ButtonStyles
                style={BorderRadius}
                key={letter}
                onClick={() => guess(letter)}
                disabled={
                  usedLetters.indexOf(letter) >= 0 ||
                  underscores.indexOf("_") < 0 ||
                  gameOver ||
                  wrongLetters >= 10
                }
              >
                {letter}
              </ButtonStyles>
            );
          })}
        </Column>
      </LetterContainer>
    </>
  );
};

export default Alphabet;
