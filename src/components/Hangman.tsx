import React, { FC, useEffect, useReducer } from "react";
import HangmanGUI from "./HangmanScreen";
import words from "../variables/words";
import letters from "../variables/letters";

interface State {
  word: string;
  underscores: string;
  guessCount: number;
  gameOver: boolean;
  usedLetters: string[];
  gamesPlayed: number;
  themeArr: string[];
  start: boolean;
  persistTheme: string;
  usedTheme: string[];
  usedThemeArr: object[];
}

type Action =
  | { type: "SET_WORD"; word: string }
  | { type: "SET_UNDERSCORES"; underscores: string }
  | { type: "SET_GUESS_COUNT"; guessCount: number }
  | { type: "SET_GAME_OVER"; gameOver: boolean }
  | { type: "SET_USED_LETTERS"; usedLetters: string[] }
  | { type: "SET_GAMES_PLAYED"; gamesPlayed: number }
  | { type: "SET_CHOOSE_THEME"; themeArr: string[] }
  | { type: "SET_START_GAME"; start: boolean }
  | { type: "SET_PERSIST_THEME"; persistTheme: string }
  | { type: "SET_USED_THEME"; usedTheme: string[] }
  | { type: "SET_USED_THEME_ARR"; usedThemeArr: object[] };

const initialState = {
  word: "kingda ka",
  underscores: "_ _ _ _",
  guessCount: 1,
  gameOver: false,
  usedLetters: [],
  gamesPlayed: 0,
  themeArr: [],
  start: false,
  persistTheme: "",
  usedTheme: [],
  usedThemeArr: []
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_WORD":
      return {
        ...state,
        word: action.word
      };
    case "SET_UNDERSCORES":
      return {
        ...state,
        underscores: action.underscores
      };
    case "SET_GUESS_COUNT":
      return {
        ...state,
        guessCount: action.guessCount
      };
    case "SET_GAME_OVER":
      return {
        ...state,
        gameOver: action.gameOver
      };
    case "SET_USED_LETTERS":
      return {
        ...state,
        usedLetters: action.usedLetters
      };
    case "SET_GAMES_PLAYED":
      return {
        ...state,
        gamesPlayed: action.gamesPlayed
      };
    case "SET_CHOOSE_THEME":
      return {
        ...state,
        themeArr: action.themeArr
      };
    case "SET_START_GAME":
      return {
        ...state,
        start: action.start
      };
    case "SET_PERSIST_THEME":
      return {
        ...state,
        persistTheme: action.persistTheme
      };
    case "SET_USED_THEME":
      return {
        ...state,
        usedTheme: action.usedTheme
      };
    case "SET_USED_THEME_ARR":
      return {
        ...state,
        usedThemeArr: action.usedThemeArr
      };
    default:
      return state;
  }
};

const Hangman: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCorrectLettersToArr = (letter: string, arr: string[]) => {
    let newWord;
    for (let i = 0; i < state.word.length; i++) {
      if (letter === state.word[i]) {
        newWord = state.word
          .split("")
          .map((alpha: string) =>
            alpha === " " ? " " : arr.indexOf(alpha) < 0 ? "_" : alpha
          )
          .join("");

        dispatch({ type: "SET_UNDERSCORES", underscores: newWord });
      }
    }

    if (newWord === state.word) {
      dispatch({ type: "SET_GAME_OVER", gameOver: true });

      dispatch({
        type: "SET_GAMES_PLAYED",
        gamesPlayed: state.gamesPlayed + 1
      });
    } else if (state.guessCount >= 9) {
      setTimeout(() => {
        dispatch({ type: "SET_GAME_OVER", gameOver: true });
      }, 1250);

      dispatch({
        type: "SET_GAMES_PLAYED",
        gamesPlayed: state.gamesPlayed + 1
      });
    }
  };

  // place clicked letters into an array
  const usedLetterArr = (letter: string) => {
    if (!hasLetterAlreadyBeenClicked(letter)) {
      dispatch({
        type: "SET_USED_LETTERS",
        usedLetters: [...state.usedLetters, letter]
      });

      addCorrectLettersToArr(letter, [...state.usedLetters, letter]);
    }
  };

  const hasLetterAlreadyBeenClicked = (letter: string) =>
    state.usedLetters.indexOf(letter) >= 0;

  // check is letter is used
  const letterIsInWord = (letter: string) => state.word.indexOf(letter) >= 0;

  const guess = (letter: string): void => {
    usedLetterArr(letter);

    if (!letterIsInWord(letter)) {
      // update count when clicked wrong letter

      dispatch({ type: "SET_GUESS_COUNT", guessCount: state.guessCount + 1 });
    }
  };

  const chooseTheme = () => {
    let themeArr: string[] = [];
    words.map(ctgry => {
      themeArr.push(ctgry.theme);

      dispatch({ type: "SET_CHOOSE_THEME", themeArr: themeArr });
      return ctgry.theme;
    });
  };

  const grabReturnIndex = (themeName: string) => {
    let newObj = {
      usedTheme: themeName
    };

    dispatch({
      type: "SET_USED_THEME_ARR",
      usedThemeArr: [...state.usedThemeArr, newObj]
    });

    let tempResult = {} as any;
    for (let u of state.usedThemeArr as any) {
      tempResult[u.usedTheme] = {
        returnIndx: 1,
        ...u,
        ...(tempResult[u.usedTheme] && {
          returnIndx: tempResult[u.usedTheme].returnIndx + 1
        })
      };
    }

    let result = Object.values(tempResult) as any;
    // console.log("result values: ", result);

    let replayedCategory = result.find(
      (o: { usedTheme: string }) => o.usedTheme === themeName
    );

    // console.log("replayed category: ", replayedCategory);

    if (replayedCategory) {
      return replayedCategory.returnIndx;
    }
  };

  const convertWordToUnderscores = (themeName: string) => {
    words.forEach(theme => {
      if (theme.theme === themeName) {
        let rand: string = "";

        dispatch({ type: "SET_PERSIST_THEME", persistTheme: themeName });

        if (!state.usedTheme.includes(themeName)) {
          dispatch({
            type: "SET_USED_THEME",
            usedTheme: [...state.usedTheme, themeName]
          });
        }

        let returnIndex = grabReturnIndex(themeName);
        // console.log("return index", returnIndex);

        if (
          state.persistTheme === themeName ||
          state.usedTheme.includes(themeName)
        ) {
          rand = theme.names[returnIndex++ % theme.names.length];
        } else {
          rand = shuffle(theme.names)[0];
        }

        dispatch({ type: "SET_WORD", word: rand.toLowerCase() });

        let hiddenWord = rand
          .split("")
          .map((letter: string) => (letter === " " ? " " : "_"))
          .join("");

        dispatch({ type: "SET_UNDERSCORES", underscores: hiddenWord });
      }
    });
  };

  const shuffle = (arr: string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // console.log("shuffled arr", arr);
    return arr;
  };

  const startGame = (theme: string) => {
    dispatch({ type: "SET_GUESS_COUNT", guessCount: 0 });

    dispatch({ type: "SET_USED_LETTERS", usedLetters: [] });
    convertWordToUnderscores(theme);

    dispatch({ type: "SET_GAME_OVER", gameOver: false });

    dispatch({ type: "SET_START_GAME", start: true });
  };

  const chooseNewTheme = () => {
    dispatch({ type: "SET_GUESS_COUNT", guessCount: 0 });

    dispatch({ type: "SET_USED_LETTERS", usedLetters: [] });

    dispatch({ type: "SET_GAME_OVER", gameOver: false });

    dispatch({ type: "SET_START_GAME", start: false });
  };

  useEffect(() => {
    chooseTheme();
  }, []);

  return (
    <>
      <HangmanGUI
        underscores={state.underscores}
        word={state.word}
        guess={guess}
        letters={letters}
        guessCount={state.guessCount}
        usedLetters={state.usedLetters}
        gameOver={state.gameOver}
        startGame={startGame}
        gamesPlayed={state.gamesPlayed}
        theme={state.themeArr}
        start={state.start}
        persistTheme={state.persistTheme}
        chooseNewTheme={chooseNewTheme}
      />
    </>
  );
};

export default Hangman;
