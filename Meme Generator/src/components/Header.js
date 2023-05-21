import React from "react"
import logo from ".././images/troll-face.png"

export default function Header(props){

    const style_light =  {boxShadow : '-1px -1px 6px 4px  Red inset ' };
    const style_dark = {boxShadow : '-1px -1px 6px 4px  blue inset '}; 
    return (
        <div className={props.darkMode ? "header darkMode" : "header light" } style={props.darkMode ? style_dark : style_light}>
            <img src={logo} / >
            <h2>Meme Generator</h2>

            <div className="toggler">
                <p className="toggler-light">Light</p>
                <div
                    className="toggler-slider"
                    onClick={props.toggleDarkMode}>

                    <div className="toggler-slider-circle"></div>
                </div>
                <p className="toggler-dark">Dark</p>



            </div>

            


            <p>React Course - Project 3</p>        
        </div>
    )
}