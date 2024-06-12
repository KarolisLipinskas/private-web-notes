const express = require("express");
const bodyParser = require("body-parser");
const yup = require("yup");
const cookieParser = require("cookie-parser");
const db = require("./DBCalls");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
const registerValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .matches(
      passwordRegex,
      'Password must contain at least one letter and one number'
    ),
});

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  registerValidationSchema
    .validate(req.body)
    .then(() => {
      
      db.findUserByEmail(email, (err, foundUser) => {
        if (foundUser) {
          return res.status(400).json({ message: "Email already exists" });
        }

        const token = uuidv4();
        const note = "";
        const newUser = {
          email,
          password,
          token,
          note,
        };
        db.saveUser(newUser, () => {
          res.status(201)
            .cookie('token', token, { httpOnly: true, SameSite: "None", secure: true })
            .json({ message: "User registered successfully" });
        });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  loginValidationSchema
    .validate(req.body)
    .then(() => {
      
      db.findUserByEmail(email, (err, foundUser) => {
        if (!foundUser) {
          return res.status(400).json({ message: "Incorect Email or Password" });
        } 
        if (foundUser.password !== password) {
          return res.status(400).json({ message: "Incorect Email or Password" });
        }

        const token = uuidv4();
        foundUser.token = token;

        db.updateUser(email, foundUser, () => {
          res.status(201)
            .cookie('token', token, { httpOnly: true, SameSite: "None", secure: true })
            .json({ message: "Login successful" });
        });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  db.findUserByToken(token, (err, foundUser) => {
    if (!foundUser) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    res
      .status(200)
      .json({ user: { email: foundUser.email, note: foundUser.note } });
  });
});

app.post("/logout", (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      SameSite: "None",
      secure: true,
      expires: new Date(0),
    })
    .end();
});

app.post("/updateUser", (req, res) => {
  const token = req.cookies.token;
  const { email, password } = req.body;

  db.findUserByToken(token, (err, foundUser) => {
    if (!foundUser) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    registerValidationSchema
      .validate(req.body)
      .then(() => {
        
        db.findUserByEmail(email, (err, foundUser2) => {
          if (foundUser2.email !== foundUser.email) {
            return res.status(400).json({ message: "Email already exists" });
          }

          foundUser2.email = email;
          foundUser2.password = password;
          db.updateUser(email, foundUser2, () => {
            res.status(201).json({ message: "Login info changed successfully" });
          });
        });
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({ message: error.message });
      });
  });
});

app.post("/updateNote", (req, res) => {
  const token = req.cookies.token;
  const { note } = req.body;

  db.updateNote(token, note, () => {
    res.status(201).json({ message: "Note updated" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
