import axios from 'axios';
import React, { useEffect } from 'react'; 
import useAlanAI from './hooks/useAlanAI';

const URL = "http://localhost:8000/api/user/"

const Main = () => {

    useEffect(() => {

        const auth = {
            headers: {
                authorization: localStorage.getItem("jwt_token")
            }
        }

        axios.get(URL, auth)
        .then(() => {
        })
        .catch((error) => {
            window.alert(error)
        })
    })

    useAlanAI(); 
    return (
        <div>
            
        </div>
    )
}

export default Main; 
