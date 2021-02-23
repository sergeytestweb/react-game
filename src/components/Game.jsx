import { assertExpressionWrapper } from "@babel/types";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper";
import "./Game.css";
import AudioPlayer from "./AudioPlayer";
import Rainbow from "../assets/mp3/img/rainbow.gif";
import Table from "./Table";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("stat"));

    if (winner) {
      if (data) {
        localStorage.setItem(
          "stat",
          JSON.stringify([...data, { winner, date: new Date() }])
        );
      } else {
        localStorage.setItem(
          "stat",
          JSON.stringify([{ winner, date: new Date() }])
        );
      }
    }
  }, [winner])

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
  const autoPlay = () => {
    return <button className="autoplay_btn">autoplay</button>;
  };

  return (
    <div className="wrapper">
      <div>
        {startNewGame()}
        {autoPlay()}
        <p className="game__info">
          {winner ? "Won is " + winner : "walks now - " + (xIsNext ? "X" : "O")}
        </p>
        {winner ? (
          <div>
            <img src={Rainbow} className="rain__bow" />
          </div>
        ) : (
          <div>
            <AudioPlayer />
            <div style={{ display: "flex"}}>
              <Board squares={board} click={handleClick} />
              <Table />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
