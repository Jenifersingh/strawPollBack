import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";

import styles from "./home.module.css";

export const Home = ({ authenticated }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <div className={`centerText ${styles.head}`}>StrawPoll</div>
        <div>Singple Voting system for everyones</div>
        <div className={`center`}>
          <Button
            onClick={() => {
              if (authenticated) {
                navigate("/poll/create");
              } else {
                navigate("/signin");
              }
            }}
          >
            Create Poll
          </Button>
        </div>
        {!authenticated && (
          <>
            <div className={`center`}>
              <Button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </Button>
            </div>
            <div className={`center`}>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={styles.background} />
    </div>
  );
};
