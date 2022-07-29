import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("/.auth/me");
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    };
    fetchCurrentUser()
      .then((response) => {
        if (response !== null && response !== undefined) {
          setLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = () => {
    const issue = {
      title: title,
      body: body,
    };
    axios.post("/api/issues", issue).then((res) => {
      setBody("");
      setTitle("");
      setSent(true);
    });
  };

  return (
    <div className="wrapper">
      {loggedIn ? (
        <>
          <input
            placeholder="Title"
            type="text"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <textarea
            placeholder="Description"
            type="text"
            name="description"
            onChange={(event) => setBody(event.target.value)}
            value={body}
          />
          <button className="blueButton" onClick={handleSubmit}>
            Post to GitHub
          </button>
          <div className="successMessage">
            {sent ? "Successfully sent to backend! <3" : ""}
          </div>
        </>
      ) : (
        <a className="blueButton" href="/.auth/login/aad">
          Login with Azure Active Directory
        </a>
      )}
    </div>
  );
};

export default Form;
