import React, { useState } from "react";

import styles from "./radio.module.css";

export const RadioInput = ({ handleClick, active, label, ...props }) => {
  return (
    <div className={styles.radioInput} onClick={handleClick} {...props}>
      <div className={`${styles.radio} ${active ? styles.active : ""}`} />
      <div>{label}</div>
    </div>
  );
};
