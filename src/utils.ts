//todo move
import {LetterScore} from "./LetterScore";

export function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export interface Metrics{
    totalScore: number
    minLetterScore: number
}

export function getMetrics(letterQuestionCount: Map<string, LetterScore>): Metrics {
    let totalScore = 0
    let minLetterScore = scoreBuffer;
    letterQuestionCount.forEach((score, value) => {
        let letterScore = score.answers.filter(a => a).length;
        totalScore = totalScore + letterScore
        minLetterScore = Math.min(minLetterScore, letterScore)
    })
    return {totalScore, minLetterScore};
}

export const scoreBuffer = 5;