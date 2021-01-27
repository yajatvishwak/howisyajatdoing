import React, { useEffect, useState } from "react";
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET_KEY,
});
const testFauna = () => {
  console.log(process.env);
  const data = client.query(
    q.Get(
      q.Ref(
        q.Collection(process.env.REACT_APP_FAUNADB_COLLECTION),
        process.env.REACT_APP_FAUNADB_REF
      )
    )
  );
  const values = data.then(function (response) {
    return response.data;
  });
  return values;
};

const Home = () => {
  const [temperature, settemperature] = useState("");
  const [spo2, setspo2] = useState("");
  const [pr, setpr] = useState("");
  const [lastMod, setlastMod] = useState(null);
  useEffect(() => {
    testFauna().then((data) => {
      console.log(data);
      setpr(data.pr);
      setspo2(data.spo2);
      settemperature(data.temperature);
      setlastMod(data.last_modified);
    });
  }, []);
  const time = new Date();
  time.setTime(lastMod);

  return (
    <div className="grid-container">
      <div className="header">
        <div className="title">In the loving memory of COVID19...</div>
        <div className="lastmod">
          I have officially tested negative for the COVID19 test on 27 January,
          2021. It has been a very tricky and long fight and I thank my parents
          who have been extremely supportive throughout. And to all my beautiful
          friend(s), Thank you for tagging along with me during this journey.
          Your care and Support kept me sane.
        </div>
      </div>
    </div>
  );
};

export default Home;
