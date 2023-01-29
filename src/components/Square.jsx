import React from "react";
import PropTypes from 'prop-types';
export const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected? 'is-selected': ''}`
  const handleSquareClick = (index)=>{
    updateBoard(index)
  }
  return (
    <div className={className} onClick={() => handleSquareClick(index)}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
  updateBoard: PropTypes.func,
  index: PropTypes.number
}
