import React from "react";
import styled from "styled-components";

interface HintProps {
  giveHint: Function;
  word: string;
  wrongLetters: number;
  lettersLeft: number;
  usedHint: boolean;
  underscores: string[];
}

interface HintButtonProps {
  whenActive: boolean;
}

const HintButton = styled.button<HintButtonProps>`
  font-size: 20px;
  margin: 10px;
  color: steelblue;
  :focus {
    outline: none;
  }
  :disabled {
    color: #ccc;
  }
  cursor: pointer;
  padding: 5px 10px;
  border: none;
`;

const Hint = ({
  giveHint,
  wrongLetters,
  word,
  lettersLeft,
  usedHint,
  underscores
}: HintProps) => {
  let guessesLeft = 10 - wrongLetters;

  return (
    <>
      <HintButton
        whenActive={guessesLeft < 2 ? true : false}
        onClick={() => giveHint(word)}
        disabled={
          underscores.indexOf("_") < 0
            ? true
            : usedHint
            ? true
            : lettersLeft < 2
            ? true
            : guessesLeft < 2
            ? true
            : false
        }
      >
        Hint
      </HintButton>
    </>
  );
};

export default Hint;
