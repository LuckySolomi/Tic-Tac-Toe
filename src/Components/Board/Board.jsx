import React from "react";
import styles from "./Board.module.css";

function Board({ cells, onCellClick, isDisabled, title, lineStyle }) {
  return (
    <div className={styles.boardContainer}>
      <h1 className={`${styles.title} ${title.colorClass || ""}`}>
        {title.text}
      </h1>
      <div className={styles.board}>
        {cells.map((cell, index) => (
          <button
            key={index}
            className={`${styles.cell}`}
            onClick={() => !isDisabled && onCellClick(index)}
            disabled={isDisabled || cell !== null}
          >
            {cell === "X" && <img src="./img/x.svg" alt="X" />}
            {cell === "O" && <img src="./img/circle.svg" alt="O" />}
          </button>
        ))}
        <div className={styles.line} style={lineStyle}></div>
      </div>
    </div>
  );
}

export default Board;
