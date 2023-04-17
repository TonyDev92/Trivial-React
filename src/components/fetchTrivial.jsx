import axios from "axios";
import { useEffect, useState } from "react";
import Settings from "./settings";



export default function FetchTrivial() {
    const [request, setRequest] = useState([]);
    
    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10&type=multiple').then(res => {
            // console.log(res);
            setRequest(res.data.results)
        })
    }, []);

    return <Settings quest = {request}></Settings>

}