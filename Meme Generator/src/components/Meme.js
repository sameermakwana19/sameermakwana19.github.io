import React from "react"
// import memesData from "../memesData"

/**
     * Challenge: Get a random image from the `memesData` array
     * when the "new meme image" button is clicked.
     * 
     * Log the URL of the image to the console. (Don't worry
     * about displaying the image yet)
     */



 /**
     * Challenge: Save the random meme URL in state
     * - Create new state called `memeImage` with an
     *   empty string as default
     * - When the getMemeImage function is called, update
     *   the `memeImage` state to be the random chosen
     *   image URL
     * - Below the div.form, add an <img /> and set the
     *   src to the new `memeImage` state you created
     */



 /**
     * Challenge: Update our state to save the meme-related
     * data as an object called `meme`. It should have the
     * following 3 properties:
     * topText, bottomText, randomImage.
     * 
     * The 2 text states can default to empty strings for now,
     * amd randomImage should default to "http://i.imgflip.com/1bij.jpg"
     * 
     * Next, create a new state variable called `allMemeImages`
     * which will default to `memesData`, which we imported above
     * 
     * Lastly, update the `getMemeImage` function and the markup 
     * to reflect our newly reformed state object and array in the
     * correct way.
     */
    
export default function Meme(props){

        let Image = {
            topText: "",
            bottomText : "",
            url : "http://i.imgflip.com/1bij.jpg"
        };

        const [allMeme,setAllMeme] = React.useState([]);
        const [memeImage , setMemeImage] = React.useState(Image);

        function randomMeme(){
            // console.log(memeImage.url);
            
            const randomNumber = (Math.floor(Math.random()*100));
            // const [memeImage, setMemeImage] = React.useState(memeElement[randomNumber].url);
            setMemeImage((prevState)=>{
                return (
                    {...prevState,url : allMeme[randomNumber].url}
                )
            })
            
          
        }

        // React.useEffect(()=>{
        //     console.log("ranned");
        //     fetch("https://api.imgflip.com/get_memes")
        //         .then(res => res.json())
        //         .then(data => setAllMeme(data.data.memes))

        // },[])


        // use effect with async and await function

          /**
            useEffect takes a function as its parameter. If that function
            returns something, it needs to be a cleanup function. Otherwise,
            it should return nothing. If we make it an async function, it
            automatically retuns a promise instead of a function or nothing.
            Therefore, if you want to use async operations inside of useEffect,
            you need to define the function separately inside of the callback
            function, as seen below:
          */
        
        React.useEffect(()=>{

            async function test(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes);
            }
            test();

        },[])






        // const [formData , setFormData] = React.useState({
        //     top:"",
        //     bottom:""
        // })
        
        
        function handleChange(event){
            const {name,value} = event.target
            setMemeImage(prevState => ({
                ...prevState,
                [name]:value
            }))
        }



    return(
    <div className={props.darkMode ? "main darkMode" : "main light"}>
        <div className="form">
            <input type="text"   className ="form-top" 
                    placeholder="Top Text"
                    name="topText"
                    value={memeImage.topText}
                    onChange={handleChange}
                    >
            </input>
            <input type="text" className ="form-bottom"
                    placeholder="Bottom text" 
                    name="bottomText"
                    value={memeImage.bottomText}
                    onChange={handleChange}
                    ></input>
        <button className="form-btn" onClick={randomMeme}>Get a new meme image 🖼</button>
        </div>
        <div className="img-container">
                <img src={memeImage.url}  className="meme-img" /> 
                <h2 className="meme--text top">
                        {memeImage.topText}
                </h2>
                <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
        </div>
    </div>
)}