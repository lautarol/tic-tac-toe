import React from 'react';
import confetti from 'canvas-confetti';
import { useState } from 'react'
import { WinnerModal } from './components/WinnerModal';
import { Square } from './components/Square';
import './App.css'
import { checkWinner, checkEndGame } from './logic/ticTacToe';
import { TURNS } from './constants'

function App() {
  const emptyBoard = Array(9).fill(null)
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  
  const updateBoard = (i)=>{
    if(board[i] || winner) return

    const newBoard = [...board]
    newBoard[i] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  const resetGame = ()=>{
    setBoard(emptyBoard)
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_, i) => {
            return( 
            <Square 
              index={i}
              key={i}
              updateBoard={updateBoard}>
                {board[i]}
            </Square>
            )
          })
        }        
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
