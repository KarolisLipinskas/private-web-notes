import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
    const navigate = useNavigate();

    return (
    <div>
      <h2>Home</h2>
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default UserHomePage;