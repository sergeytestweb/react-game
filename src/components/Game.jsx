import { assertExpressionWrapper } from "@babel/types";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper";
import "./Game.css";
import AudioPlayer from "./AudioPlayer";
import Rainbow from "../assets/mp3/img/rainbow.gif";
import Table from "./Table";
import Footer from "./Footer"

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
  const [localData, setLocalData] = useState([])
  const [isAutoplay, setIsAutoplay] = useState(false)
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
    setLocalData(data)
  }, [winner]);

  const handleClick = (index) => {
      console.log('call');
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";
    setIsNext(!xIsNext);
    setBoard(boardCopy);
  };

  useEffect(() => {
      console.log(Math.floor(Math.random() * (8) + 0))
      let autoPlay;
      if (isAutoplay) {
          autoPlay = setInterval(() => {
              console.log('interval')
            handleClick(Math.floor(Math.random() * (8) + 0))
            setIsNext(!xIsNext);
          }, 1000)
      }
      return () => clearInterval(autoPlay)
}, [isAutoplay])

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

  const clearLocalStorage = () => {
      setLocalData([])
      localStorage.clear()
  }
  
  return (
    <div className="wrapper">
      <div>
        {startNewGame()}
        <button onClick={() => clearLocalStorage()} className="clear_stats">Clear stats</button>
        <button onClick={() => setIsAutoplay(!isAutoplay)} className="autoplay_btn">autoplay</button>
        
        <p className="game__info">
          {winner ? "Won - " + winner : "walks now - " + (xIsNext ? "X" : "O")}
        </p>
        {winner ? (
          <div>
            <img src={Rainbow} className="rain__bow" />
          </div>
        ) : (
          <div>
            <AudioPlayer />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Board squares={board} click={handleClick} />
              <Table localData={localData}/>
            </div>
          </div>
        )}
        {Footer()}
      </div>
    </div>
  );
};

export default Game;
