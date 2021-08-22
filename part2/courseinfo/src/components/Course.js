import React from "react";

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    );
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => <Part key={part.id} part={part} />)}
        </>
    );
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}

const Total = ({ parts }) => {
    let total = parts.reduce((total, part) => total + part.exercises, 0);

    return (
        <b>total of {total} exercises </b>
    );
}


const Course = ({ course }) => {
    return (<>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>);
};

export default Course;
