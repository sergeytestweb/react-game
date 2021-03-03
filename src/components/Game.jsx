import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper";
import "./Game.css";
// import AudioPlayer from "./AudioPlayer";
import Rainbow from "../assets/mp3/img/rainbow.gif";
import Table from "./Table";
import Footer from "./Footer";
import { useHotkeys } from "react-hotkeys-hook";
import SettingPanel from "../components/SettingsPanel/SettingsPanel";
import useSound from "use-sound";
import clickSound from "../assets/mp3/zvuk_move.mp3";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
  const [localData, setLocalData] = useState([]);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const winner = calculateWinner(board);
  const [volume, setVolume] = useState(1);
  const [play] = useSound(clickSound, { volume });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("stat"));

    if (winner) {
      setIsAutoplay(false);
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
    setLocalData(data);
  }, [winner]);

  const handleClick = (index, newBoard) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";
    setIsNext(!xIsNext);
    setBoard(boardCopy);
    play({ volume });
  };

  useEffect(() => {
    let autoPlay;
    const newBoard = [...board];
    if (isAutoplay) {
      autoPlay = setInterval(() => {
        const random = Math.floor(Math.random() * 9 + 0);
        if (!newBoard[random]) {
          setIsNext(!xIsNext);
          newBoard.splice(random, 1, xIsNext ? "X" : "O");
          setBoard(newBoard);
        }
      }, 500);
    }
    return () => clearInterval(autoPlay);
  }, [isAutoplay, board, xIsNext]);

  const startNewGame = () => {
    setIsAutoplay(false);
    setBoard(Array(9).fill(null));
  };

  useHotkeys("n", () => setBoard(Array(9).fill(null)));

  const clearLocalStorage = () => {
    setLocalData([]);
    localStorage.clear();
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
    setBoard(Array(9).fill(null));
  };

  useHotkeys("c", clearLocalStorage);
  useHotkeys("a", () => setIsAutoplay(!isAutoplay));
  useHotkeys("z", () => setVolume(0));

  return (
    <div className="wrapper">
      <SettingPanel />
      <div>
        <div>
          <button className="start_btn" onClick={() => startNewGame()}>
            new game
          </button>
          <button onClick={() => clearLocalStorage()} className="clear_stats">
            clear stats
          </button>
          <button onClick={() => toggleAutoplay()} className="autoplay_btn">
            autoplay
          </button>
        </div>

        <p className="game__info">
          {winner
            ? "Won - " + winner
            : "takes turn now - " + (xIsNext ? "X" : "O")}
        </p>
        {winner ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={Rainbow} className="rain__bow" alt="rainbow" />
          </div>
        ) : (
          <div>
            {/* <AudioPlayer /> */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Board squares={board} click={handleClick} />
              <Table localData={localData} />
            </div>
          </div>
        )}
        <div className="hot__keys">
          <p style={{margin: "15px 0 15px 0"}}>
            hotkeys: <br />
            N - new game, C - clear stats, A - autoplay
            <br />Z - off sound, M - off music
          </p>
        </div>
        {Footer()}
      </div>
    </div>
  );
};

export default Game;
