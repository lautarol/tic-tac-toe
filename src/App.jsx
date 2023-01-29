import React from 'react';
import confetti from 'canvas-confetti';
import { useState } from 'react'
import { Square } from './components/Square';
import './App.css'
import {TURNS, WINNER_COMBOS} from './constants'

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
    }else if(newBoard.every(element => element !== null)){
      setWinner(false)
    }

  }
  const resetGame = ()=>{
    setBoard(emptyBoard)
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a ,b ,c]= combo
      if (boardToCheck[a] &&
        boardToCheck[a]==boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
        ){
        return boardToCheck[a]
      }
    }
    return null
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
      {
        winner !== null  && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : `The winner is`
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>New game</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
