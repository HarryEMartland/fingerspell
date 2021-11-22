import React from 'react';
import QuestionComponent from "./QuestionComponent";

interface QuestionComponentProps{
    answerCallback (correct: boolean, letter: string): void;
    questionLetter: string
    questionOptions: string[]
}

function Question(props: QuestionComponentProps) {

    function callback(answer: string){
        return props.answerCallback(answer === props.questionLetter, props.questionLetter)
    }

    return (
        <QuestionComponent pictureAnswer={Math.random()>=0.5} questionLetter={props.questionLetter} options={props.questionOptions} answerCallback={callback}/>
    );
}

export default Question;
