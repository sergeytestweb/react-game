import { assertExpressionWrapper } from '@babel/types'
import React, { useState } from 'react'
import Board from './Board'
import {calculateWinner} from '../helper'
import './Game.css'


const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const[xIsNext, setIsNext] = useState(true)
    const winner = calculateWinner(board)

     const handleClick = (index) => {
        const boardCopy = [...board]
        if (winner || boardCopy[index]) return
        boardCopy[index] = xIsNext ? 'x' : 'o'
        setBoard(boardCopy)
        setIsNext(!xIsNext)
     }

     const startNewGame = () => {
         return (
             <button className="start_btn" onClick={() => setBoard(Array(9).fill(null))}>Clear field</button>
         )
     }


    return (
        <div className="wrapper">
            { startNewGame() }
            <Board squares={board} click={handleClick} />
            <p className="game__info">
                { winner ? 'Won is ' + winner : 'walks now - ' + ( xIsNext ? 'x' : 'o')}
            </p>
        </div>
    );
}

export default Game;
