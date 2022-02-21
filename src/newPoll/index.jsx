import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { Modal } from "../components/modal";
import { RadioInput } from "../components/radio";
import { TextInput, INPUT_TYPES } from "../components/textInput";
import { addPoll } from "../service/apiCalls";

import styles from "./newPoll.module.css";

export const NewPoll = ({ onAuthenticatedChange }) => {
  let [question, setQuestion] = useState("");

  let [options, setOptions] = useState(["", "", ""]);

  let [pollType, setPollType] = useState("multiple");

  let [copyUrl, setCopyUrl] = useState("");

  const navigate = useNavigate();

  const onPollCreate = () => {
    let filtered = options.filter((option) => !!option);

    if (!question) {
      toast.error("Question was empty");
      return;
    }
    if (!filtered.length) {
      toast.error("Options were empty");
      return;
    }

    let obj = {};

    filtered.forEach((option) => {
      obj[option] = 0;
    });

    addPoll({
      question,
      options: obj,
      type: pollType,
    }).then((data) => {
      if (data.authenticated === false) {
        onAuthenticatedChange(data.authenticated);
        navigate("/signin");
      }
      toast.success("Data added successfully");
      setCopyUrl(`${window.origin}/poll/${data._id}`);
    });
  };

  return (
    <>
      <div className={styles.newPoll}>
        <div className={`${styles.pollMakerHead} centerText`}>Poll Maker</div>
        <div className={`${styles.pollTitle} centerText`}>
          Create Your Own Poll
        </div>
        <div className={styles.pollContainer}>
          <div className={`${styles.queTitle} centerText`}>
            What would you like to ask?
          </div>
          <div className={`${styles.divider}`}>
            <div className={styles.questionHead}>Question</div>
            <div className={styles.textContainer}>
              <TextInput
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                inputType={INPUT_TYPES.LARGE}
                value={question}
              />
            </div>
          </div>
          <div className={`${styles.divider}`}>
            <div className={styles.optionHead}>Options</div>
            {options.map((option, index) => {
              return (
                <div key={index} className={styles.textContainer}>
                  <TextInput
                    value={option}
                    onChange={(e) => {
                      let choices = [...options];

                      choices[index] = e.target.value;
                      if (
                        choices[options.length - 1] &&
                        choices.length - 1 === index
                      ) {
                        choices = [...choices, ""];
                      }
                      setOptions(choices);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.pollOptions}>
            <div className={styles.pollTypeHead}>Poll Type</div>
            <div className={styles.pollOption}>
              <div>
                <RadioInput
                  label={"Select Multiple"}
                  active={pollType === "multiple"}
                  onClick={() => {
                    setPollType("multiple");
                  }}
                />
              </div>
              <div>
                <RadioInput
                  active={pollType === "single"}
                  label={"Select one"}
                  onClick={() => {
                    setPollType("single");
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onPollCreate}>Create Poll</Button>
          </div>
        </div>
      </div>
      {copyUrl && (
        <Modal>
          <div className={`${styles.copyData}`}>
            <div className={styles.link}>{copyUrl}</div>
            <div>
              <Button>Copy link</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
