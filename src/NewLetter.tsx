import React from "react";

export function NewLetter(props: { newLetter: string, doneCallback():void }) {
    return <div style={{textAlign:"center"}}>
        <h1 className="display-1" style={{fontSize:"4em", textAlign: "center"}}>{props.newLetter}</h1>
        <h1 className="display-1 bls" style={{fontSize:"4em", textAlign: "center"}}>{props.newLetter}</h1>
        <button className="btn btn-primary btn-lg" onClick={props.doneCallback}>Continue</button>
    </div>;
}