import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("/api/user", {
        method: "GET",
        }).then((res) => {
            if (res.status >= 400 && res.status <= 500) {
                navigate("/home");
                return;
            }
            if (res.ok) {
                res.json().then(body => setEmail(body.user.email));
                return;
            }
        });
    }, []);

    const handleLogout = () => {
        fetch("/api/logout", {
          method: "POST",
        }).then(() => {
          navigate("/home");
          return;
        });
      };

    return (
    <div>
      <h2>User Home</h2>
      <div>You are logged in as: {email}</div>
      <button onClick={() => navigate("/user/updateNote")}>Edit Note</button>
      <div>
        <button onClick={() => navigate("/user/updateUser")}>Edit account</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserHomePage;
