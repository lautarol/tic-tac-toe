import React from "react";
import PropTypes from 'prop-types';
import { Square } from "./Square";

export const WinnerModal = ({winner, resetGame})=>{
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : `The winner is`
  return(
    <section className='winner'>
      <div className="text">
        <h2>{ winnerText }</h2>
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
WinnerModal.propTypes = {
  winner: PropTypes.string,
  resetGame: PropTypes.func
}
