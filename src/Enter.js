import React, { useState } from "react";
import "./Enter.scss";
const bcrypt = require("bcryptjs");
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET_KEY,
});
const updateFauna = (temperature, spo2, pr) => {
  const data = client.query(
    q.Update(
      q.Ref(
        q.Collection(process.env.REACT_APP_FAUNADB_COLLECTION),
        process.env.REACT_APP_FAUNADB_REF
      ),
      {
        data: {
          temperature: temperature,
          spo2: spo2,
          pr: pr,
          last_modified: Date.now(),
        },
      }
    )
  );
  const values = data.then(function (response) {
    //console.log(response.data);
    return response.data;
  });
  return values;
};

const Enter = () => {
  const [password, setPassword] = useState("");
  const [temperature, settemperature] = useState("");

  const [spo2, setspo2] = useState("");
  const [pr, setpr] = useState("");
  const [isloggedIn, setisLoggedIn] = useState(false);

  const auth = () => {
    const verified = bcrypt.compareSync(
      password,
      "$2a$12$Qxh/SE5rUz.OUZDUnTmUc.NFSn6E9wNoHD12At2I4dhp2ayDgmBjy"
    );
    console.log(verified);
    if (verified) {
      setisLoggedIn(true);
    }
  };
  const onSubmit = () => {
    updateFauna(temperature, spo2, pr).then((val) => {
      if (val) {
        alert("Updated, go back to sleep", val);
      } else {
        alert("Couldnt update. Another reason for you to stay awake");
      }
    });
  };

  if (isloggedIn) {
    return (
      <div className="container">
        <div className="title">
          Welcome Yajat
          <div className="inputContainer">
            <input
              className="input"
              placeholder="temperature"
              onChange={(e) => settemperature(e.target.value)}
            />
            <input
              className="input"
              placeholder="spo2"
              onChange={(e) => setspo2(e.target.value)}
            />
            <input
              className="input"
              placeholder="PR"
              onChange={(e) => setpr(e.target.value)}
            />
            <button onClick={onSubmit} className="input">
              submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <input
          className="input"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="input" onClick={auth}>
          login
        </button>
      </div>
    );
  }
};

export default Enter;
