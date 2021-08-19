import React, { useState } from "react";

const AnecdotesWithMostVotes = ({ anecdote, votes }) => {
  if (votes !== 0) {
    return (
      <>
        {anecdote}
        <br></br>
        has {votes} votes
        <br></br>
      </>
    );
  }
  return <>Nothing</>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0)
  );
  const [anecdoteHasMostVotes, setAnecdoteHasMostVotes] = useState(0);

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteAnecdote = () => {
    const p = [...points];
    p[selected] += 1;
    setPoints(p);
    findAnecdoteHasMostVotes(p);
  };

  const findAnecdoteHasMostVotes = (p) => {
    const index = maxValue(p);
    setAnecdoteHasMostVotes(index);
  };

  const maxValue = (arr) => {
    let index = 0;
    let maxValue = arr[index];

    arr.forEach((value, i) => {
      if (value > maxValue) {
        index = i;
        maxValue = arr[index];
      }
    });
    return index;
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <AnecdotesWithMostVotes
        anecdote={anecdotes[anecdoteHasMostVotes]}
        votes={points[anecdoteHasMostVotes]}
      />
    </div>
  );
};

export default App;
