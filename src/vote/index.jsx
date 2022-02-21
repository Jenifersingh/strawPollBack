import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../components/button";
import { CheckBox } from "../components/checkbox";
import { getPoll, updatePoll } from "../service/apiCalls";

import styles from "./vote.module.css";

export const Vote = ({ onAuthenticatedChange }) => {
  const [options, setOptions] = useState({});

  const [checked, setChecked] = useState({});

  const [totalVoters, setTotalVoters] = useState(0);

  const { pollId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPoll(pollId).then((data) => {
      console.log(data);
      if (data.authenticated === false) {
        onAuthenticatedChange(data.authenticated);
        navigate("/signin");
      }
      setOptions(data.options);
      setTotalVoters(data.totalVoters);
    });
  }, []);

  const handleCheck = (option, value) => {
    const allOptions = { ...options };
    if (value) {
      allOptions[option] += 1;
    } else {
      allOptions[option] -= 1;
    }

    setOptions(allOptions);
    let obj = { ...checked };

    if (obj[option]) {
      obj = { ...obj, [option]: false };
    } else {
      obj = { ...obj, [option]: true };
    }

    // obj = checked[option] ? {...obj, [option]: false} ? {...obj, [option]: true};

    setChecked(obj);
  };

  const handleSubmit = () => {
    updatePoll(pollId, { options: options, totalVoters: totalVoters + 1 }).then(
      (data) => {
        if (data.authenticated === false) {
          navigate("/signin");
          onAuthenticatedChange(data.authenticated);
        }
        toast.success(data.message);
        navigate(`/poll/${pollId}/result`);
      }
    );
  };

  return (
    <div className={styles.vote}>
      <div className={`${styles.container} centerText`}>
        <div className={`${styles.question} centerText`}>Question</div>
        <div className={styles.description}>Description</div>
        <div className={styles.options}>
          {Object.keys(options).map((option) => {
            return (
              <div>
                <CheckBox
                  active={checked[option]}
                  onClick={() => handleCheck(option, !checked[option])}
                  label={option}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <Button onClick={() => handleSubmit()}>Submit</Button>
          </div>
          <div>
            <Button>Results Page</Button>
          </div>
        </div>
      </div>
      <div className={`${styles.container} `}>
        <div className={`${styles.copyData}`}>
          <div className={styles.link}>{window.location.href}</div>
          <div>
            <Button>Copy link</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
