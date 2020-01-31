import React, { FC, useEffect, useReducer, useCallback, useMemo } from "react";
import HangmanScreen from "./HangmanScreen";
import words from "../variables/words";
import letters from "../variables/letters";

interface State {
  word: string;
  underscores: string;
  wrongLetters: number;
  gameOver: boolean;
  usedLetters: string[];
  gamesPlayed: number;
  themeArr: string[];
  start: boolean;
  persistTheme: string;
  usedTheme: string[];
  usedThemeArr: object[];
  randomCategory: string;
  counter: number;
  randCategoryChosen: string;
  wordIndex: number;
  // totalGuesses: number;
  lettersLeft: number;
  usedHint: boolean;
  wins: number;
  losses: {
    lost: boolean;
    amount: number;
    missingLetters: string[];
    missingIndex: number[];
  };
  missedLetter: string;
}

type Action =
  | { type: "SET_WORD"; word: string }
  | { type: "SET_UNDERSCORES"; underscores: string }
  | { type: "SET_WRONG_LETTER_AMOUNT"; wrongLetters: number }
  | { type: "SET_GAME_OVER"; gameOver: boolean }
  | { type: "SET_USED_LETTERS"; usedLetters: string[] }
  | { type: "SET_GAMES_PLAYED"; gamesPlayed: number }
  | { type: "SET_CHOOSE_THEME"; themeArr: string[] }
  | { type: "SET_START_GAME"; start: boolean }
  | { type: "SET_PERSIST_THEME"; persistTheme: string }
  | { type: "SET_USED_THEME"; usedTheme: string[] }
  | { type: "SET_USED_THEME_ARR"; usedThemeArr: object[] }
  | { type: "SET_RANDOM_CATEGORY"; randomCategory: string }
  | { type: "SET_COUNTER"; counter: number }
  | { type: "SET_RAND_WORD_CHOSEN"; randCategoryChosen: string }
  | { type: "SET_WORD_INDEX"; wordIndex: number }
  // | { type: "SET_TOTAL_GUESSES"; totalGuesses: number }
  | { type: "SET_TOTAL_LETTERS_LEFT"; lettersLeft: number }
  | { type: "SET_USED_HINT"; usedHint: boolean }
  | { type: "SET_WINS" }
  | { type: "SET_LOSSES"; missingLetters: string[]; missingIndex: number[] }
  | { type: "SET_MISSED_LETTER"; missedLetter: string };

const initialState = {
  word: "",
  underscores: "_ _ _ _",
  wrongLetters: 0,
  gameOver: false,
  usedLetters: [],
  gamesPlayed: 0,
  themeArr: [],
  start: false,
  persistTheme: "",
  usedTheme: [],
  usedThemeArr: [],
  randomCategory: "",
  counter: 0,
  randCategoryChosen: "",
  wordIndex: -1,
  // totalGuesses: 0,
  lettersLeft: 10,
  usedHint: false,
  wins: 0,
  losses: {
    amount: 0,
    lost: false,
    missingLetters: [],
    missingIndex: []
  },
  missedLetter: ""
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
    case "SET_WRONG_LETTER_AMOUNT":
      return {
        ...state,
        wrongLetters: action.wrongLetters
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
    case "SET_RANDOM_CATEGORY":
      return {
        ...state,
        randomCategory: action.randomCategory
      };
    case "SET_COUNTER":
      return {
        ...state,
        counter: action.counter
      };
    case "SET_RAND_WORD_CHOSEN":
      return {
        ...state,
        randCategoryChosen: action.randCategoryChosen
      };
    case "SET_WORD_INDEX":
      return {
        ...state,
        wordIndex: action.wordIndex
      };
    // case "SET_TOTAL_GUESSES":
    //   return {
    //     ...state,
    //     totalGuesses: action.totalGuesses
    //   };
    case "SET_TOTAL_LETTERS_LEFT":
      return {
        ...state,
        lettersLeft: action.lettersLeft
      };

    case "SET_USED_HINT":
      return {
        ...state,
        usedHint: action.usedHint
      };
    case "SET_WINS":
      return {
        ...state,
        wins: state.wins + 1
      };
    case "SET_LOSSES":
      return {
        ...state,
        losses: {
          ...state.losses,
          amount: state.losses.amount + 1,
          lost: true,
          missingLetters: action.missingLetters,
          missingIndex: action.missingIndex
        }
      };

    case "SET_MISSED_LETTER":
      return {
        ...state,
        missedLetter: action.missedLetter
      };
    default:
      return state;
  }
};

const Hangman: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // deconstructed word
  const { word } = state;

  const addCorrectLettersToArr = (letter: string, arr: string[]) => {
    let newWord;
    let result: any[] = [];

    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        newWord = word
          .split("")
          .map((alpha: string) =>
            alpha === " " ? " " : arr.indexOf(alpha) < 0 ? "_" : alpha
          )
          .join("");

        dispatch({ type: "SET_UNDERSCORES", underscores: newWord });

        let counts = {} as any;
        let elements = newWord.split("");

        elements.forEach((x: string | number) => {
          counts[x] = (counts[x] || 0) + 1;
        });

        dispatch({ type: "SET_TOTAL_LETTERS_LEFT", lettersLeft: counts._ });
      }
    }

    // winner
    if (newWord === word && state.losses.missingLetters.length <= 0) {
      console.log("this is if we have won");
      dispatch({ type: "SET_WINS" });
      setTimeout(() => {
        dispatch({ type: "SET_GAME_OVER", gameOver: true });
      }, 3000);
    }

    // loser
    if (state.wrongLetters >= 10) {
      console.log("you have lost");
      let indexOfMissedLetterArr: number[] = [];

      for (let j = 0; j < state.underscores.length; j++) {
        if (state.underscores[j] === "_") {
          indexOfMissedLetterArr.push(j);
          result = word
            .split("")
            .filter(
              (element: any, i: number) =>
                indexOfMissedLetterArr.indexOf(i) !== -1
            );
        }
      }

      dispatch({
        type: "SET_LOSSES",
        missingLetters: result,
        missingIndex: indexOfMissedLetterArr
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
      if (state.wrongLetters >= 10) {
      }
      addCorrectLettersToArr(letter, [...state.usedLetters, letter]);
    }
  };

  const hasLetterAlreadyBeenClicked = (letter: string) =>
    state.usedLetters.indexOf(letter) >= 0;

  // check is letter is used
  const letterIsInWord = (letter: string) => word.indexOf(letter) >= 0;

  const guess = (letter: string): void => {
    if (!letterIsInWord(letter)) {
      dispatch({
        type: "SET_WRONG_LETTER_AMOUNT",
        wrongLetters: state.wrongLetters += 1
      });
    }
    usedLetterArr(letter);
  };

  const chooseTheme = () => {
    let themeArr: string[] = [];
    words.map(ctgry => {
      themeArr.push(ctgry.theme);
      dispatch({ type: "SET_CHOOSE_THEME", themeArr: themeArr });
      return ctgry.theme;
    });
  };

  // places player at the following index according
  // to which category they chose
  const grabCorrectIndexFromCategory = (themeName: string) => {
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

    let replayedCategory = result.find(
      (o: { usedTheme: string }) => o.usedTheme === themeName
    );

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

        let returnIndex = grabCorrectIndexFromCategory(themeName);
        console.log("return index", returnIndex);

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
    console.log("shuffled arr", arr);
    return arr;
  };

  const randomize = (arr: string[]) => {
    let index: number;

    if (state.wordIndex !== -1) {
      index = state.wordIndex;
    } else {
      index = 0;
    }

    let randomNumTenFifteen = Math.floor(Math.random() * (15 - 10 + 1) + 10);

    let animateCategories = () => {
      dispatch({
        type: "SET_COUNTER",
        counter: state.counter += randomNumTenFifteen
      });

      let randomCategory: string = arr[index++ % arr.length];

      console.log(state.counter);

      dispatch({ type: "SET_RANDOM_CATEGORY", randomCategory: randomCategory });

      let wordIndex = arr.indexOf(randomCategory);

      dispatch({ type: "SET_WORD_INDEX", wordIndex: wordIndex });

      let interval = setTimeout(animateCategories, state.counter);
      if (state.counter > 235) {
        console.log("RANDOM CAT:: ", randomCategory);
        clearInterval(interval);
        dispatch({
          type: "SET_RAND_WORD_CHOSEN",
          randCategoryChosen: randomCategory
        });
        setTimeout(() => {
          startGame(arr[wordIndex]);
        }, 1250);
      }
    };
    setTimeout(animateCategories, state.counter);
  };

  const giveHint = (word: string) => {
    console.log("the hint word", word);
    // check which letters are in word
    letters.forEach(letter => {
      if (word.includes(letter)) {
        usedLetterArr(letter);
      }
    });
    dispatch({
      type: "SET_WRONG_LETTER_AMOUNT",
      wrongLetters: state.wrongLetters + 1
    });
    dispatch({ type: "SET_USED_HINT", usedHint: true });
  };

  const startGame = (theme: string) => {
    convertWordToUnderscores(theme);

    dispatch({ type: "SET_WRONG_LETTER_AMOUNT", wrongLetters: 0 });

    dispatch({ type: "SET_USED_LETTERS", usedLetters: [] });

    dispatch({ type: "SET_GAME_OVER", gameOver: false });

    dispatch({ type: "SET_START_GAME", start: true });

    dispatch({ type: "SET_COUNTER", counter: 0 });

    dispatch({ type: "SET_USED_HINT", usedHint: false });

    dispatch({ type: "SET_TOTAL_LETTERS_LEFT", lettersLeft: 10 });
  };

  const chooseNewTheme = () => {
    dispatch({
      type: "SET_RAND_WORD_CHOSEN",
      randCategoryChosen: ""
    });
    dispatch({ type: "SET_WRONG_LETTER_AMOUNT", wrongLetters: 0 });

    dispatch({ type: "SET_USED_LETTERS", usedLetters: [] });

    dispatch({ type: "SET_GAME_OVER", gameOver: false });

    dispatch({ type: "SET_START_GAME", start: false });
  };

  const displayMissingLetters = (missingLetArr: string[]) => {
    // WIP
    let wrongWord: string = "";

    state.losses.missingIndex.forEach((num, index) => {
      setTimeout(() => {
        wrongWord = state.underscores
          .split("")
          .map((alpha: string, i: number) =>
            alpha === "_" && word[i] === word[num] ? word[num] : alpha
          )
          .join("");

        console.log(wrongWord);

        dispatch({ type: "SET_UNDERSCORES", underscores: wrongWord });
      }, index * 300);
    });

    // below is an alternative way that is
    // similar but not quite there

    // const text: string | any[] = [];
    // text[0] = word.split("");
    // let delay = 400;
    // let newArr: string[] = [];

    // const addOneChar = (i: number, j: number) => {
    //   newArr.push(text[i][j]);
    //   console.log(newArr);
    //   dispatch({ type: "SET_UNDERSCORES", underscores: newArr.join("") });

    //   if (j + 1 < text[i].length) {
    //     setTimeout(() => {
    //       addOneChar(i, j + 1);
    //     }, j / delay + 35);
    //   }
    // };

    // setTimeout(() => {
    //   addOneChar(0, 0);
    // });
  };

  const funcCallback = useCallback(displayMissingLetters, [
    state.losses.missingLetters,
    state.missedLetter
  ]);

  const newFuncMemo = useMemo(() => funcCallback, [funcCallback]);

  useEffect(() => {
    chooseTheme();

    newFuncMemo(state.losses.missingLetters);
  }, [newFuncMemo, state.losses.missingLetters, state.missedLetter]);

  return (
    <>
      <HangmanScreen
        underscores={state.underscores}
        word={word}
        guess={guess}
        letters={letters}
        wrongLetters={state.wrongLetters}
        usedLetters={state.usedLetters}
        gameOver={state.gameOver}
        startGame={startGame}
        gamesPlayed={state.gamesPlayed}
        theme={state.themeArr}
        start={state.start}
        persistTheme={state.persistTheme}
        chooseNewTheme={chooseNewTheme}
        randomize={randomize}
        randomCategory={state.randomCategory}
        randCategoryChosen={state.randCategoryChosen}
        counter={state.counter}
        giveHint={giveHint}
        lettersLeft={state.lettersLeft}
        usedHint={state.usedHint}
        wins={state.wins}
        losses={state.losses.amount}
      />
    </>
  );
};

export default Hangman;
