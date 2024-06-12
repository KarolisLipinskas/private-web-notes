const fs = require("fs");

module.exports.saveUser = (userDetails, callBack) => {
    fs.readFile("data/user.json", "utf8", (err, data) => {
        if (err) {
            return callBack(err);
        }
        const users = JSON.parse(data);
        users.push(userDetails);
        fs.writeFile("data/user.json", JSON.stringify(users), "utf8", callBack);
    });
};

module.exports.updateUser = (oldEmail, userDetails, callBack) => {
    fs.readFile("data/user.json", "utf8", (err, data) => {
        if (err) {
            return callBack(err);
        }
        const users = JSON.parse(data);
        const user = users.find((user) => user.email === oldEmail);
        user.email = userDetails.email;
        user.password = userDetails.password;
        user.token = userDetails.token;
        fs.writeFile("data/user.json", JSON.stringify(users), "utf8", callBack);
    });
};

module.exports.findUserByEmail = (email, callBack) => {
    fs.readFile("data/user.json", "utf8", (err, data) => {
        if (err) {
            return callBack(err);
        }
        const users = JSON.parse(data);
        callBack(
            null,
            users.find((user) => user.email === email)
        );
    });
};

module.exports.findUserByToken = (token, callBack) => {
    fs.readFile("data/user.json", "utf8", (err, data) => {
        if (err) {
            return callBack(err);
        }
        const users = JSON.parse(data);
        callBack(
            null,
            users.find((user) => user.token === token)
        );
    });
};

module.exports.updateNote = (token, newNote, callBack) => {
    fs.readFile("data/user.json", "utf8", (err, data) => {
        if (err) {
            return callBack(err);
        }
        const users = JSON.parse(data);
        const user = users.find((user) => user.token === token);
        user.note = newNote;
        fs.writeFile("data/user.json", JSON.stringify(users), "utf8", callBack);
    });
};