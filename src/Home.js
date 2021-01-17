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
        <div className="title">How is yajat doing?</div>
        <div className="lastmod">
          This is a record system because i am bored and i have a lot of time
          since i have COVID19. Screw you, China. My best wishes with those who
          are presently suffering through corona. Speedy recovery guys!
        </div>
        <div className="sym">
          Actual Symptoms
          <ul>
            <li>Very mild cough. Almost negligible</li>
            <li>No temperature</li>
            <li>Body at Normal functioning </li>
            <li>
              Medications:
              <ul>
                <li>Fabi Flu 800 anti viral</li>
                <li>Cee plus - Multi Vitamins</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="lastmod">
          Last updated:{" "}
          <b>
            {time.toDateString()} -{" "}
            {time.toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </b>
        </div>
      </div>

      <div className="main">
        <div class="parent">
          <div class="box">
            <div onClick={testFauna} className="card">
              <div className="value">{temperature} F</div>
              <div className="text">Temperature</div>
            </div>
          </div>
          <div class="box">
            <div className="card">
              <div className="value">{spo2} %</div>
              <div className="text">SPO2 level</div>
            </div>
          </div>
          <div className="box">
            <div className="card">
              <div className="value">{pr} bpm</div>
              <div className="text">Pulse Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
