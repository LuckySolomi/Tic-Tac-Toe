import React, { useState } from "react";
import Board from "../Board/Board.jsx";
import Messenger from "../Messenger/Messenger.jsx";
import styles from "./App.module.css";

function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const players = [
    {
      imgSrc: "./img/x.svg",
      playerName: "Player 1",
      symbol: "X",
    },
    {
      imgSrc: "./img/circle.svg",
      playerName: "Player 2",
      symbol: "O",
    },
  ];

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWinner = (newCells) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newCells[a] &&
        newCells[a] === newCells[b] &&
        newCells[a] === newCells[c]
      ) {
        setWinner({ symbol: newCells[a], combination });
        updateScore(newCells[a]);
        return;
      }
    }
    if (newCells.every((cell) => cell !== null)) setWinner("Draw");
  };

  const updateScore = (winningSymbol) => {
    if (winningSymbol === "O") {
      setScore((prevScore) => ({
        ...prevScore,
        player1: prevScore.player1 + 1,
      }));
    } else if (winningSymbol === "X") {
      setScore((prevScore) => ({
        ...prevScore,
        player2: prevScore.player2 + 1,
      }));
    }
  };

  const handleClick = (index) => {
    if (cells[index] || winner) return;

    const newCells = [...cells];
    newCells[index] = isXNext ? "X" : "O";
    setCells(newCells);
    setIsXNext(!isXNext);
    checkForWinner(newCells);
  };

  const getTitle = (playerSymbol) => {
    if (winner) {
      if (winner.symbol === "Draw") return { text: "Draw!" };
      return winner.symbol === playerSymbol
        ? { text: "You win!", colorClass: styles.winColor }
        : { text: "You lost!", colorClass: styles.lostColor };
    }
    if (isXNext && playerSymbol === "X") return { text: "Your turn:" };
    if (!isXNext && playerSymbol === "O") return { text: "Your turn:" };
    return { text: "Wait your opponent." };
  };

  const getLineStyle = () => {
    if (!winner || !winner.combination) return {};

    const [a, b, c] = winner.combination;
    let style = {
      position: "absolute",
      borderRadius: "8px",
      background: "#ffffff",
    };

    if (a === 0 && b === 1 && c === 2) {
      style = {
        ...style,
        top: "50px",
        left: "15px",
        width: "90%",
        height: "6px",
      };
    } else if (a === 3 && b === 4 && c === 5) {
      style = {
        ...style,
        top: "145px",
        left: "15px",
        width: "90%",
        height: "6px",
      };
    } else if (a === 6 && b === 7 && c === 8) {
      style = {
        ...style,
        top: "237px",
        left: "15px",
        width: "90%",
        height: "6px",
      };
    } else if (a === 0 && b === 3 && c === 6) {
      style = {
        ...style,
        top: "15px",
        left: "50px",
        height: "90%",
        width: "6px",
      };
    } else if (a === 1 && b === 4 && c === 7) {
      style = {
        ...style,
        top: "15px",
        left: "145px",
        height: "90%",
        width: "6px",
      };
    } else if (a === 2 && b === 5 && c === 8) {
      style = {
        ...style,
        top: "15px",
        left: "237px",
        height: "90%",
        width: "6px",
      };
    } else if (a === 0 && b === 4 && c === 8) {
      style = {
        ...style,
        top: "-31px",
        left: "146px",
        width: "6px",
        height: "120%",
        transform: "rotate(-45deg)",
      };
    } else if (a === 2 && b === 4 && c === 6) {
      style = {
        ...style,
        top: "-31px",
        left: "146px",
        width: "6px",
        height: "120%",
        transform: "rotate(45deg)",
      };
    }

    return style;
  };

  const handleSendMessage = (text, symbol) => {
    setMessages((prevMessages) => [...prevMessages, { text, symbol }]);
  };

  return (
    <div className={styles.app}>
      <header className={styles.mainHeader}>
        <p>Player 1</p>
        <div className={styles.scoreContainer}>
          <h1>
            Score:{score.player1}:{score.player2}
          </h1>
          <button
            className={styles.header_button}
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
        <p>Player 2</p>
      </header>
      <main className={styles.playersField}>
        <div className={styles.componentContainer}>
          <Board
            cells={cells}
            onCellClick={handleClick}
            playerSymbol="X"
            isDisabled={!isXNext}
            title={getTitle("X")}
            winner={winner}
            lineStyle={getLineStyle()}
          />
          <Board
            cells={cells}
            onCellClick={handleClick}
            playerSymbol="O"
            isDisabled={isXNext}
            title={getTitle("O")}
            winner={winner}
            lineStyle={getLineStyle()}
          />
        </div>
        <div className={styles.componentContainer}>
          {players.map((player) => (
            <Messenger
              key={player.symbol}
              imgSrc={player.imgSrc}
              playerName={player.playerName}
              messages={messages}
              onSendMessage={handleSendMessage}
              symbol={player.symbol}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
