import React, { useEffect } from 'react'; 
import MainForm from './components/MainForm'

const URL = "http://localhost:8000/api/user/"

const Main = () => {
    return (
        <div>
            <MainForm/>
        </div>
    )
}

export default Main; 
