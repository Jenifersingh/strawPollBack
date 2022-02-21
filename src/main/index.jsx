import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SignIn, SignUp } from "../auth";
import { Home } from "../home";
import { NewPoll } from "../newPoll";
import { Result } from "../result";
import { Vote } from "../vote";

export const Main = () => {
  const [authenticated, setAuthenticated] = useState();

  const onAuthenticatedChange = (value) => {
    setAuthenticated(value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} />} />
        <Route
          path="/signin"
          element={<SignIn onAuthenticatedChange={onAuthenticatedChange} />}
        />
        <Route
          path="/signup"
          element={<SignUp onAuthenticatedChange={onAuthenticatedChange} />}
        />
        <Route
          path="/poll/:pollId"
          element={<Vote onAuthenticatedChange={onAuthenticatedChange} />}
        />

        <Route
          path="/poll/:pollId/result"
          element={<Result onAuthenticatedChange={onAuthenticatedChange} />}
        />
        <Route
          path="/poll/create"
          element={<NewPoll onAuthenticatedChange={onAuthenticatedChange} />}
        />
      </Routes>
      <ToastContainer theme="colored" />
    </Router>
  );
};
