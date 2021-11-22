import React from 'react';

interface QuestionProps {
    questionLetter: string;
    options: string[];
    pictureAnswer: boolean
    answerCallback(answer: string): void;
}

function QuestionComponent(props: QuestionProps) {

    return (
        <div style={{textAlign:'center'}}>
            <h1 className={"display-1" + (props.pictureAnswer?" bls":"")}>{props.questionLetter}</h1>
            <div className="d-grid gap-2">
                {props.options.map(option => <button className={"btn btn-outline-primary"+ (props.pictureAnswer?"":" bls")} style={{fontSize:"4em"}} key={option} onClick={(e) => {
                    e.preventDefault()
                    e.currentTarget.blur()
                    props.answerCallback(option)
                }}>{option}</button>)}
            </div>
        </div>
    );
}

export default QuestionComponent;
