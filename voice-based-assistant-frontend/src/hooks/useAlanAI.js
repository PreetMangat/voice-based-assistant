import {useEffect, useState, useCallback} from 'react'; 
import alanBtn from '@alan-ai/alan-sdk-web';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useHistory } from "react-router-dom";

const URL = "http://localhost:8000/api/user/"; 
const INSTRUCTIONS = {
    UPDATE_NAME: 'update-name', 
    UPDATE_PHONE_NUMBER: 'update-phone number', 
    UPDATE_ADDRESS: 'update-address', 
    DELETE: 'delete', 
}; 

export default function useAlanAI() {
    const [alanInstance, setAlanInstance] = useState(); 
    const auth = {
        headers: {
            authorization: localStorage.getItem("jwt_token")
        }
    }
    let history = useHistory()
    const current_email_address = localStorage.getItem("jwt_token") ?
                                  jwt_decode(localStorage.getItem("jwt_token")).email_address 
                                  : history.push("/login")

    const updatePhoneNumber = useCallback(({detail : {field_value}}) => {
            alanInstance.playText("Sure, give me a moment while I update your phone number"); 

            let data = {
                current_email_address: current_email_address,
                phone_number: field_value
            }

            axios.patch(URL, data, auth)
            .then((res) => {
                if(res.status === 200) {
                    alanInstance.playText("You're all set! Have a great day!"); 
                }

            })
            .catch((err) => {
                window.alert(err)
            })
        },[alanInstance]); 

    const updateName = useCallback(({detail : {field_value}}) => {
        alanInstance.playText("Sure, I am updating your name in your file.")

    }, [alanInstance]); 

    const updateAddress = useCallback(() => { 
    alanInstance.playText("Sure, I am updating your address in your file. ")}
    , [alanInstance]); 

    useEffect(() => {
        window.addEventListener(INSTRUCTIONS.UPDATE_NAME,updateName); 
        window.addEventListener(INSTRUCTIONS.UPDATE_PHONE_NUMBER, updatePhoneNumber); 
        window.addEventListener(INSTRUCTIONS.UPDATE_ADDRESS, updateAddress); 
        return () => {
            window.removeEventListener(INSTRUCTIONS.UPDATE_NAME, updateName); 
            window.removeEventListener(INSTRUCTIONS.UPDATE_PHONE_NUMBER, updatePhoneNumber); 
            window.removeEventListener(INSTRUCTIONS.UPDATE_ADDRESS, updateAddress); 
        }
    }, [updateName,updatePhoneNumber, updateAddress] ); 


    useEffect(() => {
        if(alanInstance != null) return; 
        setAlanInstance(alanBtn({
            'top': '30px', 
            'left': '15px', 
            key: process.env.REACT_APP_ALAN_AI_KEY, 
            onCommand: ({command, payload}) => {
                window.dispatchEvent(new CustomEvent(command, {detail:payload})); 
            }
        })
        )
    }, []); 
    return null; 
   
}
