import React from "react";

import main from "./main.png";

const Home = () => {
  return (
    <div className="grid-container">
      <div className="header">
        <div className="title">In the loving memory of COVID19...</div>
        <div className="lastmod">
          I have officially tested negative for the COVID19 test on 27 January,
          2021. It has been a very tricky and long fight and I thank my parents
          who have been extremely supportive throughout. And to all my beautiful
          friend(s), Thank you for tagging along with me during this journey.
          Your care and support have kept me sane.
        </div>
        <div className="lastmod">
          <img src={main} alt="byby" className="responsive-img" />
        </div>
      </div>
    </div>
  );
};

export default Home;
