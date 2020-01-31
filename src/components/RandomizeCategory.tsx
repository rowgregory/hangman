import React from "react";
import styled from "styled-components";

interface RandomCategoryProps {
  categories: string[];
  randomize: Function;
  counter: number;
}

const RandomBtn = styled.button`
  :focus {
    outline: none;
    background: #ccc;
  }
  :disabled {
    color: #234;
  }
`;

const RandomizeCategory = ({
  categories,
  randomize,
  counter
}: RandomCategoryProps) => {
  return (
    <>
      <RandomBtn
        style={{ cursor: "pointer" }}
        onClick={() => randomize(categories)}
        disabled={counter > 0 ? true : false}
      >
        Random
      </RandomBtn>
    </>
  );
};

export default RandomizeCategory;
