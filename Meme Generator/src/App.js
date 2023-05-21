import React from "react"
import Header from "./components/Header"
import Meme from "./components/Meme"

export default function App(){

    const [darkMode , setDarkMode] = React.useState(true)

    function toggleDarkMode(){
        setDarkMode(prevState => !prevState)
    }


    return (
        <div>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/ >
            <Meme darkMode={darkMode}/ >
        </div>
    )
}