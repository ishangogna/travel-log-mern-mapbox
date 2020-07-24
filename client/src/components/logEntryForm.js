import React, { useState } from 'react';


const LogEntry = ( { longitude, latitude, getLogs } ) => {
    
    const addLog = (e) => {
        e.preventDefault();
        const url = window.location.hostname === 'localhost' ? 'http://localhost:2000/api' : 'https://node-test.ishangogna.vercel.app/';
        fetch(url,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                title : title,
                comments : comments,
                longitude : longitude,
                latitude : latitude
            })
        })
        .then(response => response.json())
        .then(getLogs(true))
        .catch(err=> console.log(err));
    
    }

    const [title, setTitle] = useState('');
    const [comments, setComments] = useState('');
    return ( 
        <form style = {{display : 'flex', flexDirection : 'column'}}>
                            <input 
                                type="text" 
                                placeholder = "Name of the location" 
                                onChange = {(e)=> setTitle(e.target.value)} 
                            />
                            <textarea 
                                type="text" 
                                rows= {5} 
                                placeholder = "Comments"
                                onChange = {(e)=> setComments(e.target.value)} 

                            />
                            <button onClick = {addLog}>Add a log!</button>
                        </form>
     );
}
 
export default LogEntry;