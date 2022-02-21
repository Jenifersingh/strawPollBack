import React from "react";

import styles from "./textInput.module.css";

export const INPUT_TYPES = {
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
};

export const TextInput = ({
  type = "text",
  inputType = INPUT_TYPES.MEDIUM,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`${styles.textInput} ${
        inputType === INPUT_TYPES.LARGE ? styles.largeInput : ""
      } ${inputType === INPUT_TYPES.MEDIUM ? styles.mediumInput : ""}`}
      {...props}
    />
  );
};
