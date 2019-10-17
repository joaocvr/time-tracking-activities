import React from "react";

const Home = () => {
  return (
    <div>
      Track your activities, manage your time!
      <ol>
        <u>
          <b>Backlog</b>
        </u>
        <li>
          List activities by the selected day (open with the current day).
        </li>
        <li>Use an app backend (in GO) to persist data, with REST.</li>
        <li>Use an app backend (in GO) to persist data, with GraphQL.</li>
        <li>Use a login firebase service.</li>
        <li>Use a firebase persist service.</li>
        <li>
          Build charts to evaluate:
          <ol>
            <li>How many minutes was spend in an activity.</li>
            <li>What is the most activity practiced.</li>
          </ol>
        </li>
        <li>Send e-mail with daily report.</li>
      </ol>
    </div>
  );
};

export default Home;
