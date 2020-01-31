import React from "react";
import { Tween } from "react-gsap";
import styled, { css, keyframes } from "styled-components";

const DropBody = keyframes`
  80% {
    transform: translateY(190px)
  }
  100% { 
    transform:translateY(175px);
  }

`;

interface DelayProps {
  wait: boolean;
}

const Body = styled.g<DelayProps>`
  animation: ${props =>
    props.wait &&
    css`
      ${DropBody} 0.4s 1 ease-in-out  forwards
      animation-delay: 1.5s;
      /* transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); */
    `};
`;

interface EndGameAnimationProps {
  wrongLetters: number;
  lettersLeft: number;
  underscores: string[];
}

export const EndGameAnimation = ({
  wrongLetters,
  lettersLeft,
  underscores
}: EndGameAnimationProps) => {
  let amountOfPartsToDisplay = 10 - wrongLetters;
  // console.log(amountOfPartsToDisplay);
  let win = underscores.indexOf("_") < 0;
  // console.log("WIN:: ", win);
  return (
    <>
      <svg
        height="400"
        width="400"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {wrongLetters >= 10 && (
          <Tween
            from={{
              svgDraw: 0
            }}
            to={{
              svgDraw: 1
            }}
            duration={0.4}
            delay={1.4}
          >
            <line
              x1="200"
              y1="20"
              x2="200"
              y2={250}
              stroke="black"
              strokeWidth="1.5"
            ></line>
          </Tween>
        )}
        {wrongLetters >= 1 && (
          <line
            x1="200"
            y1="20"
            x2="200"
            y2={60}
            stroke="black"
            strokeWidth="1.5"
          ></line>
        )}
        {win && amountOfPartsToDisplay >= 10 && (
          <>
            {console.log("we here")}
            <line
              x1="200"
              y1="20"
              x2="200"
              y2={60}
              stroke="black"
              strokeWidth="1.5"
            ></line>
          </>
        )}

        <Body wait={wrongLetters >= 10} id="body">
          <g id="head">
            {wrongLetters >= 2 && (
              <circle
                cx="200"
                cy="80"
                r="20"
                stroke="black"
                strokeWidth="4"
                fill="white"
              />
            )}
            {win && amountOfPartsToDisplay >= 9 && (
              <circle
                cx="200"
                cy="80"
                r="20"
                stroke="black"
                strokeWidth="4"
                fill="white"
              />
            )}
            <g id="rEyes">
              {wrongLetters >= 3 && <circle cx="193" cy="80" r="4" />}
              {win && amountOfPartsToDisplay >= 8 && (
                <circle cx="193" cy="80" r="4" />
              )}
              {wrongLetters >= 4 && <circle cx="207" cy="80" r="4" />}
            </g>
            <g id="xEyes" className="hide">
              {wrongLetters >= 10 && (
                <>
                  <line stroke="white" x1="190" y1="78" x2="196" y2="84" />
                  <line stroke="white" x1="204" y1="78" x2="210" y2="84" />
                  <line stroke="white" x1="190" y1="84" x2="196" y2="78" />
                  <line stroke="white" x1="204" y1="84" x2="210" y2="78" />
                </>
              )}
            </g>
            <g id="mouth" stroke="black" strokeWidth="4">
              {wrongLetters >= 10 ? (
                <circle cx="201" cy="90" r="4" fill="none" strokeWidth="2" />
              ) : (
                wrongLetters >= 5 && <line x1="197" y1="90" x2="204" y2="90" />
              )}
            </g>
          </g>
          <g id="torso" stroke="black" strokeWidth="4">
            {wrongLetters >= 6 && <line x1="200" y1="100" x2="200" y2="150" />}
            {wrongLetters >= 7 && (
              <line id="armL" x1="200" y1="120" x2="170" y2="140" />
            )}
            {wrongLetters >= 8 && (
              <line id="armR" x1="200" y1="120" x2="230" y2="140" />
            )}
            {wrongLetters >= 9 && (
              <line id="legL" x1="200" y1="150" x2="180" y2="190" />
            )}
            {wrongLetters >= 10 && (
              <line id="legR" x1="200" y1="150" x2="220" y2="190" />
            )}
          </g>
        </Body>

        <g id="stand" stroke="black" strokeWidth="4">
          <line x1="10" y1="250" x2="150" y2="250" />

          <Tween
            from={{ rotation: 0 }}
            duration={wrongLetters >= 10 ? 1 : 0}
            ease="Back.easeOut"
            to={{
              rotation: wrongLetters >= 10 ? 90 : 0
            }}
          >
            <line
              stroke="black"
              id="door1"
              x1="150"
              y1="250"
              x2="200"
              y2="250"
            ></line>
          </Tween>
          <Tween
            from={{ rotation: 0, transformOrigin: "right" }}
            duration={wrongLetters >= 10 ? 1 : 0}
            ease="Back.easeOut"
            to={{
              rotation: wrongLetters >= 10 ? -90 : 0
            }}
          >
            <line
              stroke="black"
              id="door2"
              x1="200"
              y1="250"
              x2="250"
              y2="250"
            />
          </Tween>
          <line x1="250" y1="250" x2="390" y2="250" />
          <line x1="100" y1="325" x2="100" y2="20" />
          <line x1="100" y1="22" x2="200" y2="22" />
          <line x1="100" y1="70" x2="150" y2="22" />
        </g>
      </svg>
    </>
  );
};
