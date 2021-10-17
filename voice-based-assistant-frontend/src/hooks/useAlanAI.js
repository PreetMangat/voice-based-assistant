import {useEffect, useState, useCallback} from 'react'; 
import alanBtn from '@alan-ai/alan-sdk-web';

const INSTRUCTIONS = {
    UPDATE_NAME: 'update-name'
}; 

export default function useAlanAI() {
    const [alanInstance, setAlanInstance] = useState(); 
    const updateInfo = useCallback(() => {
            alanInstance.playText("Sure, I can definitely help you with that! What is the new name?")
        },[alanInstance]); 

    useEffect(() => {
        window.addEventListener(INSTRUCTIONS.UPDATE_NAME,updateInfo); 
        return () => {window.removeEventListener(INSTRUCTIONS.UPDATE_NAME, updateInfo)}
    }, [updateInfo] ); 
    useEffect(() => {
        if(alanInstance != null) return; 
        setAlanInstance(alanBtn({
            'top': '30px', 
            'left': '15px', 
            key: process.env.REACT_APP_ALAN_AI_KEY, 
            onCommand: ({command}) => {
                window.dispatchEvent(new CustomEvent(command)); 
            }
        })
        )
    }, []); 
    return null; 
   
}
