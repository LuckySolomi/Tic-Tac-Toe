import React, { useState } from "react";
import styles from "./Messenger.module.css";

function Messenger({ imgSrc, playerName, messages, onSendMessage, symbol }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue, symbol);
      setInputValue("");
    }
  };

  return (
    <div className={styles.messengerContainer}>
      <header className={styles.messengerHeader}>
        <div className={styles.headerCircle}>
          <img src={imgSrc} alt="symbol" />
        </div>
        <p>{playerName}</p>
      </header>
      <div className={styles.textField}>
        {messages.map((msg) => (
          <div
            className={`${styles.message} ${
              msg.symbol === symbol ? styles.ownMessage : styles.otherMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          className={styles.messengerInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button type="submit" className={styles.sendIcon}>
          <img src="./img/sendIcon.png" alt="send icon" />
        </button>
      </form>
    </div>
  );
}

export default Messenger;
