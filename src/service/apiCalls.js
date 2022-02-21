import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const API = "http://localhost:8000";

export const addPoll = (body) => {
  return fetch(`${API}/poll/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.status === 401) {
        return { authenticated: false }.json();
      }

      return data.json();
    })
    .catch((err) => {
      toast.error("Error Occurred. Please try again later");
    });
};

export const getPoll = (pollId) => {
  return fetch(`${API}/poll/${pollId}/`, {
    method: "GET",
  })
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.status === 401) {
        return { authenticated: false }.json();
      }
      return data.json();
    })
    .catch((err) => {
      toast.error("Error Occurred. Please try again later");
    });
};

export const updatePoll = (pollId, body) => {
  return fetch(`${API}/poll/${pollId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.status === 401) {
        return { authenticated: false }.json();
      }
      return data.json();
    })
    .catch((err) => {
      toast.error("Error Occurred. Please try again later");
    });
};

export const signIn = (body) => {
  return fetch(`${API}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.status === 401) {
        return { authenticated: false }.json();
      }

      cookies.set("token", data.token);
      return data.json();
    })
    .catch((err) => {
      toast.error("Error Occurred. Please try again later");
    });
};

export const signUp = (body) => {
  return fetch(`${API}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      // if (data.status === 401) {
      //   return { authenticated: false }.json();
      // }
      return data.json();
    })
    .catch((err) => {
      toast.error("Error Occurred. Please try again later");
    });
};
