import { Avatar} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './Firebase';
import './SidebarChat.css';

function SidebarChat({id,name,lastmsg,addNewChat}) {
    const [seed,setSeed]=useState('');
    const [messages,setMessages]=useState("");

    useEffect(()=>{
       setSeed(Math.floor(Math.random()*500000))
    },[]);

    useEffect(()=>{
        if(id){
            db.collection("groups").doc(id).collection("messages").orderBy("timestamp",'desc').
         onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc)=>doc.data()))
         ))
        }
         
    },[id])

    const createChat=()=>{

        const groupName=prompt("Enter Group Name For Chat");

        if(groupName){
            //add name to the database
             db.collection("groups").add({
                 name:groupName,
             });
        }
    };
    return !addNewChat?(
      <Link to={`/groups/${id}`}>
        <div className="sidebarchat">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="sidebarchat__info">
                <h6>{name} </h6>
                <p>{messages[0]?.message}</p>

            </div>
        </div>
     </Link>    
    ):(
     <div onClick={createChat} className="sidebarChat">
         <h5>Add New Chat</h5>
     </div>
    );
}

export default SidebarChat
