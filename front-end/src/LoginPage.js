import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    fetch("/api/login", {
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
      <h2>User Login</h2>
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
      <div style={{ display: 'flex', gap: '65px' }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate("/home")}>Return</button>
      </div>
    </div>
  );
};

export default LoginPage;
