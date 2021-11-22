import React, {useState} from 'react';
import Question from "./Question";
import {letters} from "./data";
import {getMetrics, scoreBuffer, shuffle} from "./utils";
import {LetterScore} from "./LetterScore";
import {NewLetter} from "./NewLetter";

const startingLetter = letters[0];

function App() {

    const [letterQuestionCount, setLetterQuestionCount] = useState<Map<string, LetterScore>>(new Map([[startingLetter, {
        letter: startingLetter,
        answers: []
    }]]))
    const [level, setLevel] = useState(1)
    const [letter, setLetter] = useState(startingLetter)
    const [totalQuestionCount, setTotalQuestionCount] = useState(1)
    const [newLetter, setNewLetter] = useState(startingLetter)

    function answerCallback(correct: boolean, letter: string) {
        setTotalQuestionCount(totalQuestionCount + 1)
        const letterScore = letterQuestionCount.get(letter)
        const newLetterQuestionCount = new Map(letterQuestionCount)
        if (letterScore) {
            newLetterQuestionCount.set(letter, {letter, answers: [...letterScore.answers, correct].slice(-scoreBuffer)})
        } else {
            newLetterQuestionCount.set(letter, {letter, answers: [correct]})
        }

        const {minLetterScore} = getMetrics(newLetterQuestionCount)

        if (minLetterScore / scoreBuffer >= 0.8) {
            setLevel(level + 1)
            const newLetter = letters[level];
            setLetter(newLetter)
            newLetterQuestionCount.set(newLetter, {answers: [], letter: newLetter})
            setNewLetter(newLetter)
        } else {
            setLetter(shuffle(letters.slice(0, level))[0])
        }
        setLetterQuestionCount(newLetterQuestionCount)
    }

    const {totalScore} = getMetrics(letterQuestionCount);

    const questionOptions = shuffle([letter, ...shuffle(letters.filter(l => l !== letter)).slice(-3)])

    return (
        <div className="App container">
            <div className="row">
                <div className="col">Level {level}</div>
                <div className="col" style={{textAlign:"right"}}>Score {totalScore}/{scoreBuffer * letterQuestionCount.size}</div>
            </div>

            {newLetter && <NewLetter newLetter={newLetter} doneCallback={()=>setNewLetter("")}/>}
            {!newLetter && <Question answerCallback={answerCallback}
                      questionLetter={letter}
                      questionOptions={questionOptions}/>}
        </div>
    );
}

export default App;

