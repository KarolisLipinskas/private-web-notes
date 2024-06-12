import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/user", {
        method: "GET",
        }).then((res) => {
            if (res.status >= 400 && res.status <= 500) {
                navigate("/home");
                return;
            }
        });
    }, []);

  const handleUpdateUser = () => {
    fetch("/api/updateUser", {
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
        res.json().then(body => setMessage(body.message));
        return;
      }
    });
  };

  return (
    <div>
      <h2>Update your login info</h2>
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
        <button onClick={handleUpdateUser}>Update</button>
        <button onClick={() => navigate("/user/home")}>Return</button>
      </div>
    </div>
  );
};

export default UpdateUserPage;
