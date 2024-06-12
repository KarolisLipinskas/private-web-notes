import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateNotePage = () => {
  const navigate = useNavigate();
  
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/user", {
        method: "GET",
        }).then((res) => {
            if (res.status >= 400 && res.status <= 500) {
                navigate("/home");
                return;
            }
            if (res.ok) {
                res.json().then(body => setNote(body.user.note));
                return;
            }
        });
    }, []);

  const handleUpdateNote = () => {
    fetch("/api/updateNote", {
      method: "POST",
      body: JSON.stringify({ note }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      res.json().then(body => setMessage(body.message));
    });
  };

  return (
    <div>
      <h2>Your note</h2>
      <div>
      <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={5} // Adjust the number of rows as needed
          cols={30} // Adjust the number of columns as needed
          style={{ resize: 'both' }} // allow resizing of textarea
        />
      </div>
      <div>
        { message ? message : "" }
      </div>
      <div style={{ display: 'flex', gap: '130px' }}>
        <button onClick={handleUpdateNote}>Update</button>
        <button onClick={() => navigate("/user/home")}>Return</button>
      </div>
    </div>
  );
};

export default UpdateNotePage;
