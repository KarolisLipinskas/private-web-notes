import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.status >= 400 && res.status <= 500) {
        res.json().then(body => setMessage(body.message));
        return;
      }
      if (res.ok) {
        //res.json().then(body => setMessage(body.message));
        navigate("/user/home");
        return;
      }
    });
  };

  return (
    <div>
      <h2>User registration</h2>
      <div>Email:</div>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div>Password:</div>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div>
        { message ? message : "" }
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <button onClick={handleRegister}>Register</button>
        <button onClick={() => navigate("/home")}>Return</button>
      </div>
    </div>
  );
};

export default RegistrationPage;
