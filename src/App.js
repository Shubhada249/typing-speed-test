import React,{useState,useEffect} from 'react';
import './App.css';

/*The .split(' ') method is called on the string. This method splits the string into an array of substrings 
wherever a space is encountered. Each substring becomes an element in the resulting array. 
Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
.sort() uses comparison fun....if comparison fun returns (1 elements sorted in asc & -1 elements sorted in desc)*/
const words= `Board, finish, Burn, Conquer, inflate, Vomit, Feel, Crashed, Stretch, dare, Miss, redo, 
Sever, saponify, Consign, word, Dry, Reuse, Wear, optimize, Orde, Pollute, Incise, ill-treat, Pacify, astonish, 
decorate, Crashes, Partake, Bury, report, Diminish, Dress, Sail, Mean, Understand, infect, Rule, Distribute, 
Arrange, Recur, Skill, eye, Midnight, Charity, Match, Brush, Sky, idea, Guidance, North, map, Session, audience, 
Sash, Stink, Fail, Toss, Desire, look, Bash, Upset, Bid, Hear, Moo, multiply, Protect, Output, Carry, Push, wear, 
Spring, Touch, Undo, Sob, Abandon, suck, Dazzle, Insure, rush, Capture, Preach, relax, Surge, Occur, grant, Sprout, 
inscribe, Dance, permit, Chat, moan, point, Blade, investment, Reason, bead, Recommendation, Lamp, definition, Texture, 
Harmony, Hydrant, minister, Surgery, Affair, Quilt, Emphasis, Liquid, Departure, Riddle, Mother, Machine, Tradition, 
Motion, School, surprise, cough, Offer, Cook`.split(', ').sort(()=>Math.random()>0.5?1:-1);



function FunOnWord(props) //called for each word in words array
  {
    const {text,active,correct}=props;

    if(correct===true)
    {
      return <span className="correct">{text} </span>;
    }

    else if(correct===false)
    {
      return <span className="incorrect">{text} </span>;
    }

    if(active)
    {
      return <span className="active">{text} </span>;
    }
    else
    {
      return <span>{text} </span>;
    }
  }

FunOnWord=React.memo(FunOnWord);  //prevents unnecessary re-renders...re-renders only when props of function changes



function Timer(props)
{
  const {correctWords,startCounting,setUserInput,setStartCounting,setInputDisabled}=props;
  const [timeElapsed, setTimeElapsed]=useState(0);

  useEffect(()=>{
    let id;
    if(startCounting)
    {
      id=setInterval(()=>{ //setInterval will be called every second=1000milliseconds
        setTimeElapsed((timeElapsed)=>
        {
          if (timeElapsed >= 60) {
            setUserInput("Time is Over....");
            setStartCounting(false);
            setInputDisabled(true);
            return 60;   // Stop the timer when timeElapsed is 61 seconds
          }
          return timeElapsed+1});  
      },1000)
    }
    return ()=>clearInterval(id);
  },[startCounting]);  //when value of props.startCounting changes useeffect will run

  const minutes=timeElapsed/60;
  return (<div className="Time-Speed">
            
            {/* When page loads minutes=0, so correctWords/minutes=NaN
            A || B, it returns the value of A if A is considered "truthy" (i.e., not equal to false, 0, "", null, undefined, or NaN). If A is "falsy," it returns the value of B. 
            .toFixed(2) will show only 2 digits after decimal point*/}
             <div className="Speed">
                <div className="Speed-Square">
                  <p>{((correctWords/minutes) || 0).toFixed(2)}</p>
                  WPM
                </div>
                <b>Speed</b>
              </div>
            
              <div className="Time">
                  <p>{timeElapsed}</p>
                  seconds
              </div>
            
         </div>);
}



function App() {
  const [userInput,setUserInput]=useState("");
  const [activeWordIndex,setActiveWordIndex]=useState(0);//index of word going to type 
  const [correctWordArray,setCorrectWordArray]=useState([]);//boolean array:if word typed correctly=>true, else=>false
  const [startCounting, setStartCounting] =useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  function processInput(value)/* as you enter one more character onchange event occurs and this function is called*/
  {
    setStartCounting(true); //different
    
    if(value.endsWith(" "))
    {
      setCorrectWordArray(data=>{
        const word=value.trim(); //remove whitespace characters (spaces, tabs, and newlines) from both the beginning and end of a string
        const newResult=[...data];
        newResult[activeWordIndex]=word===words[activeWordIndex];
        return newResult;
      })
      setActiveWordIndex(activeWordIndex=>activeWordIndex+1);
      setUserInput("");
    }
    else
    {
      setUserInput(value);
    }
  }

  
  
  
  return(
    <div className="main">
      <p>TYPING SPEED TEST</p>
      <h1>Test your typing skills</h1>
      {/* correctWordArray.filter(Boolean).length give count of value "true" in correctWordArray 
      filter method iterates through each element of correctWordArray and calls the Boolean function on each element.
      Boolean method returns true for "truthy" values and false for null, undefined, 0, an empty string "", or false values.
      correctWordArray.filter(Boolean) results new array that contains only the "truthy" elements from the original correctWordArray
      .length retrieves the length of this filtered array  */}
      <Timer startCounting={startCounting} correctWords={correctWordArray.filter(Boolean).length} setUserInput={setUserInput} setStartCounting={setStartCounting} setInputDisabled={setInputDisabled}/>       
      
      <p>{words.map((word,index)=>{
          return <FunOnWord text={word} active={index===activeWordIndex} correct={correctWordArray[index]}/>
        })}
      </p> 

      {/* as you enter one more character onchange event occurs */}
      <input placeholder="Start Typing...." type="text" value={userInput} disabled={inputDisabled} onChange={(e)=>processInput(e.target.value)}/> {/* e.target refers to input element &  e.target.value stores whatever is in input field* & whatever in value attribute is displayed in input field*/}
     
      
    </div>
  );
}
 
export default App;
