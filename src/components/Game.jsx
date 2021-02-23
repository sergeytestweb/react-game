import { assertExpressionWrapper } from "@babel/types";
import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper";
import "./Game.css";
import AudioPlayer from "./AudioPlayer";
import Rainbow from "../assets/mp3/img/rainbow.gif";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "x" : "o";
    setBoard(boardCopy);
    setIsNext(!xIsNext);
  };

  const startNewGame = () => {
    return (
      <button
        className="start_btn"
        onClick={() => setBoard(Array(9).fill(null))}
      >
        new game
      </button>
    );
  };

  return (
    <div className="wrapper">
      {startNewGame()}
      <p className="game__info">
        {winner ? "Won is " + winner : "walks now - " + (xIsNext ? "X" : "O")}
      </p>
      {winner ? (
        <div>
          <img src={Rainbow} />
        </div>
      ) : (
        <div>
          <AudioPlayer />
          <Board squares={board} click={handleClick} />
        </div>
      )}
    </div>
  );
};

export default Game;
