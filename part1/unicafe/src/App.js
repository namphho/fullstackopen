import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  averageScore,
  positiveScore,
}) => {
  if (total !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine title="Good" value={good} />
          <StatisticLine title="Neutral" value={neutral} />
          <StatisticLine title="Bad" value={bad} />
          <StatisticLine title="all" value={total} />
          <StatisticLine title="average" value={averageScore} />
          <StatisticLine title="positive" value={positiveScore} />
        </tbody>
      </table>
    );
  }
  return <div> No feedback given </div>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalOfFeedBack, settotalOfFeedBack] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [positiveScore, setPositiveScore] = useState(0);

  const voteGood = () => {
    let totalPoint = totalOfFeedBack + 1;
    let goodPoint = good + 1;
    settotalOfFeedBack(totalPoint);
    setGood(goodPoint);
    calculateScore(goodPoint, bad, totalPoint);
    calculatePositiveScore(goodPoint, totalPoint);
  };

  const voteNeutral = () => {
    let totalPoint = totalOfFeedBack + 1;
    settotalOfFeedBack(totalPoint);
    setNeutral(neutral + 1);
    calculateScore(good, bad, totalPoint);
    calculatePositiveScore(good, totalPoint);
  };
  const voteBad = () => {
    let totalPoint = totalOfFeedBack + 1;
    let badPoint = bad + 1;
    settotalOfFeedBack(totalPoint);
    setBad(badPoint);
    calculateScore(good, badPoint, totalPoint);
    calculatePositiveScore(good, totalPoint);
  };

  const calculateScore = (goodPoint, badPoint, total) => {
    const score = (goodPoint - badPoint) / total;
    setAverageScore(score);
  };

  const calculatePositiveScore = (goodPoint, total) => {
    const positiveScore = goodPoint / total;
    setPositiveScore(positiveScore);
  };

  return (
    <div>
      <h1> Give Feedback</h1>
      <Button handleClick={voteGood} text="Good" />
      <Button handleClick={voteNeutral} text="Neutral" />
      <Button handleClick={voteBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={totalOfFeedBack}
        averageScore={averageScore.toFixed(1)}
        positiveScore={positiveScore.toFixed(1) * 100 + "%"}
      />
    </div>
  );
};

export default App;
