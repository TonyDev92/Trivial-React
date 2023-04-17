import axios from "axios";
import { useState } from "react";



export default function Settings(params) {
    const { quest } = params;
    // const [category, setCategory] = useState({});
    const [dificulty, setDificulty] = useState({});
    const [question, setQuestion] = useState({});
    const [game, setGame] = useState([]);
    let [att , setAtt] = useState(0);
    let [score , setScore] = useState(0);  
    console.log(game);
    // console.log(question);
    // console.log(dificulty);
    // console.log(category);
    // const getCategory = ($event) => {
    //     setCategory({ ...category, [$event.target.name]: $event.target.value })
    // }
    const getDificulty = ($event) => {
        setDificulty({ ...dificulty, [$event.target.name]: $event.target.value })
    }
    const getQuestions = ($event) => {
        
        setQuestion({ ...question, [$event.target.name]: $event.target.value })

    }
    const attemps = (answer , correctAnswer) => {
        if(answer !== correctAnswer.correct_answer){
            setAtt(att++)
        }else{
            setScore(score++)
        }
    }
    const start = (e) => {
        e.preventDefault();
        // axios.get(`https://opentdb.com/api.php?amount=${question.question}&difficulty=${dificulty.dificulty}&category=${category.category}`).then(res => {
        //     console.log(res);
        // })
        axios.get(`https://opentdb.com/api.php?amount=${question.question}&difficulty=${dificulty.dificulty}`).then(res => {
            console.log(res);
            setGame(res.data.results);
            
        })
        
        
    }

    return (
        <>
        <form>
            {/* <label htmlFor="category"> Choose Category</label>
            <select onChange={getCategory} name="category">
                {quest.map((category, index) =>
                    <option key={index} value={category.value}>{category.category}</option>
                )}
            </select> */}
            <label htmlFor="dificulty"> Choose Difficulty</label>
            <select onChange={getDificulty} name="dificulty">
                {quest.map((dificulty, index) =>
                    <option key={index} value={dificulty.value}>{dificulty.difficulty}</option>
                )}
            </select>
            <label htmlFor="question"> Choose Num of Questions</label>
                <input type="number" name="question" value={question.value} onChange={getQuestions}></input>

            <button type="submit" onClick={start}>Start</button>
        </form>
        
        <div>
                <div>
                    <h4>attemps : {att}</h4> <h4>Score : {score}</h4>
                </div>
            {game.map((e, index) => {

                const correctAnswer = e.correct_answer;
                const fail = e.incorrect_answers;
                const allAnswers = [...fail, correctAnswer];
                const aleatoryPosition =  Math.floor(Math.random() * allAnswers.length);
                allAnswers.sort(() => aleatoryPosition - 1);

                return(
                    <div key={index}>
                        <h5>{e.question}</h5>
                        <ul>
                            {allAnswers.map((answer, index) => <button onClick={()=> attemps(answer , e)} key={index}>{answer}</button>)}
                            
                        </ul>
                    </div>
                )
            })}
        </div>
    </>
    )

}