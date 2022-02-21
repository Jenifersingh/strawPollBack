import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { TextInput } from "../components/textInput";
import { signIn, signUp } from "../service/apiCalls";

import styles from "./auth.module.css";

export const SignIn = ({ onAuthenticatedChange }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    signIn(user).then((data) => {
      onAuthenticatedChange(true);

      navigate("/");
    });
  };
  return (
    <div className={styles.authContainer}>
      <div className={styles.auth}>
        <div className={`centerText ${styles.authText}`}>Sign In</div>
        <div>
          <TextInput
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Email"
          />
        </div>
        <div>
          <TextInput
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            placeholder="Password"
          />
        </div>

        <div className={`center`}>
          <Button onClick={handleSignIn}>Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    signUp(user).then((data) => {
      navigate("/signin");
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.auth}>
        <div className={`centerText ${styles.authText}`}>Sign Up</div>
        <div>
          <TextInput
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Email"
          />
        </div>
        <div>
          <TextInput
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={`center`}>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};
