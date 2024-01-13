import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { ref, onValue, set } from "firebase/database";

export const GameContext = createContext(null);

//Winning Function
const winningLines = [
  { line: [0, 1, 2] },
  { line: [3, 4, 5] },
  { line: [6, 7, 8] },
  { line: [0, 3, 6] },
  { line: [1, 4, 7] },
  { line: [2, 5, 8] },
  { line: [0, 4, 8] },
  { line: [2, 4, 6] },
];
const won = (values, setGame) => {
  for (let i = 0; i < 8; i++) {
    const { line } = winningLines[i];
    const line1 = values[line[0]];
    const line2 = values[line[1]];
    const line3 = values[line[2]];
    if (line1 && line1 == line2 && line2 == line3) {
      if (line1 === "X") {
        setGame(GameState.playerXWins);
      } else {
        setGame(GameState.playerOWins);
      }
    }
  }
};

const GameState = {
  playerXWins: 0,
  playerOWins: 1,
  draw: 2,
  inProgress: 3,
};

const GameContextProviderMain = ({ children }) => {
  const [values, setValues] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [game, setGame] = useState(GameState.inProgress);
  //Handling clicking
  const handleVal = (i) => {
    if (values[i] || game !== GameState.inProgress) {
      return;
    }
    const dum = isX ? "X" : "O";
    setPlayerTurn(`${isX ? "O" : "X"}`);
    setValues((prev) => {
      const temp = [...prev];
      temp[i] = dum;
      return temp;
    });
    setIsX((prev) => !prev);
  };

  const setListener = () => {
    // 1. Game listener
    onValue(ref(db, "board"), (snapshot) => {
      if (snapshot.exists()) {
        const data = JSON.parse(snapshot.val());
        setValues(data);
      }
    });
    // 2. Player turn listener
    onValue(ref(db, "playerTurn"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPlayerTurn(data);
      }
    });
  };
  useEffect(() => {
    setListener();
  }, []);

  useEffect(() => {
    //update firebase
    //playerTurn
    const playerTurnRef = ref(db, "playerTurn");
    set(playerTurnRef, playerTurn);
  }, [playerTurn]);
  useEffect(() => {
    won(values, setGame);
    //update firebase
    //Board
    const boardRef = ref(db, "board");
    set(boardRef, JSON.stringify(values));
  }, [values]);

  const playing = `Player turn ${playerTurn}`;
  const notPlaying = `Player ${
    game == GameState.playerXWins ? "X" : "O"
  } won !`;
  const providerValue = {
    game,
    playing,
    notPlaying,
    values,
    handleVal,

    GameState,
  };
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProviderMain;
