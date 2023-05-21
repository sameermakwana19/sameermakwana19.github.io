import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import "./style.css"
import 	Confetti from "react-confetti"

export default function App(){

        function allNewDice(){
            const newDice = [];
            for(let i = 0 ; i<10;i++){
                newDice.push( 
                    {
                        value : Math.ceil(Math.random()*6),
                        isHeld : false,    
                        id:nanoid()
                });
            }
            return newDice;
        }

        function holdDice(id){
        	setDice(oldDice => oldDice.map(die=>{
        		return id === die.id ? {...die,isHeld:!die.isHeld}:die;
        	}))
        	
        }

       const [time , setTime] =React.useState(0);
      const [won , setWon] = React.useState(false);

      const [dice , setDice] = React.useState(allNewDice());

      React.useEffect(()=>{
      	const allHeld = dice.every(die => die.isHeld);
      	const firstValue = dice[0].value;
      	const allSameValue = dice.every(die=>die.value == firstValue)
      	if(allHeld && allSameValue){
      		setWon(true);
      	}
      },[dice]);

    const element = dice.map((ele)=> <Die
     isHeld={ele.isHeld} 
     key={ele.id}
     value= {ele.value}
     holdDice={()=>holdDice(ele.id)}
      /> )

    function rollDice(){
    	if(won){
    		setDice(allNewDice());
    		setWon(false)
    		setTime(0);
    	}
    	else{
    		setTime(prev => prev+1);
        setDice(old=>old.map((ele)=>{
        	return ele.isHeld ?{...ele} : {...ele,value:Math.ceil(Math.random()*6)} 
        }))
    	}
    }

    return (
        <main>
        {won && <Confetti />}
        <h1 className="title" >Tenzies</h1>
        <p className="instructions">
        	Roll untill all dice are the same. Click each die to freeze it as its current value between rolls.
        </p>
        <h1 className="rolls">Rolls : {time}</h1>
            <div className="die-container">
                    {element}
            </div>
            <button className="roll-btn" onClick={rollDice}>{won ?  "New Game" : "Roll"} </button>

         
        </main>
    )
}