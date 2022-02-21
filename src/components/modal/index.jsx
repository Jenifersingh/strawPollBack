import React from "react";

import styles from "./modal.module.css";

export const Modal = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
