import React, { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/button";
import { CheckBox } from "../components/checkbox";
import { getPoll } from "../service/apiCalls";

import styles from "./result.module.css";

export const Result = ({ onAuthenticatedChange }) => {
  const [options, setOptions] = useState({});

  const [totalVoters, setTotalVoters] = useState(0);

  const { pollId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPoll(pollId).then((data) => {
      if (data.authenticated === false) {
        onAuthenticatedChange(data.authenticated);
        navigate("/signin");
      }
      setOptions(data.options);
      setTotalVoters(data.totalVoters);
    });
  }, []);

  return (
    <div className={styles.vote}>
      <div className={`${styles.container} centerText`}>
        <div className={`${styles.question} centerText`}>Question</div>
        <div className={styles.description}>Description</div>

        <div className={styles.optionsContainer}>
          <div className={`${styles.option} ${styles.optionHeading}`}>
            <div>Option</div>
            <div>Voters</div>
          </div>
          {Object.keys(options).map((option, index) => {
            return (
              <div className={`${styles.option}`} key={index}>
                <div>{option}</div>
                <div>{options[option]}</div>
              </div>
            );
          })}
        </div>
        <div className={`${styles.totalVoters} centerText`}>
          Total Voters: {totalVoters}
        </div>
      </div>
      <div className={`${styles.container} `}>
        <div className={`${styles.copyData}`}>
          <div className={styles.link}>
            {window.location.href.split("/result")[0]}
          </div>
          <div>
            <Button>Copy link</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
