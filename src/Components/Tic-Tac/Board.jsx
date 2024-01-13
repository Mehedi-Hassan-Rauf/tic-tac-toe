import { useContext } from "react";
import Tile from "./Tile";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";

const Board = () => {
  const { logOut } = useContext(AuthContext);
  const { game, playing, notPlaying, values, handleVal, GameState } =
    useContext(GameContext);
  return (
    <div className="board w-screen flex flex-col items-center">
      <h1 className=" text-4xl text-white my-5">Tic Tac Toe</h1>
      <button onClick={logOut}>Log out</button>
      <div className="turn w-4/5 my-8 text-xl text-white w-screen flex justify-end">
        {game === GameState.inProgress ? playing : notPlaying}
      </div>
      <div className=" w-fit grid grid-cols-3">
        {values.map((value, i) => {
          return <Tile value={value} key={i} index={i} handleVal={handleVal} />;
        })}
      </div>
    </div>
  );
};

export default Board;
