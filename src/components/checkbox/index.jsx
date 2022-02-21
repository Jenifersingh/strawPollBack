import React from "react";

import styles from "./checkbox.module.css";

export const CheckBox = ({ label = "Test", active, ...props }) => {
  return (
    <div className={styles.checkBoxContainer} {...props}>
      <div className={`${styles.checkbox} ${active ? styles.active : ""}`} />
      <div>{label}</div>
    </div>
  );
};
