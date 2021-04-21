import { Avatar, IconButton } from '@material-ui/core';
import {  AttachFile, MoreVert} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import './Chat.css';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';


function Chat() {
    // const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const { groupId } = useParams();
    const [groupName,setGroupName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();


    useEffect(()=>{
         
           if(groupId){
               db.collection("groups")
               .doc(groupId)
               .onSnapshot((snapshot)=>
                setGroupName(snapshot.data().name));



            db.collection("groups").doc(groupId).
            collection("messages").orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>doc.data()))
             )

           }

    },[groupId])

    // useEffect(()=>{
    //     setSeed(Math.floor(Math.random()*500000));

    // },[])

    const sendMessage=(e)=>{
        e.preventDefault();
        //console.log("you typed",input);

        db.collection("groups").doc(groupId).
        collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        })

        setInput("");
        
    }
    return (
        <div className="chat">
           <div className="chat_header">
               <IconButton> <Avatar  src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*500000)}.svg`}/></IconButton>
               <div className="chat__headerInfo">
                   <h4>{groupName}</h4>
                   <p>Last seen at {" "}{
                       new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                   }</p>

               </div>
               <div className="chat__headerRight">
                  <IconButton><VideocamIcon /></IconButton>
                  <IconButton><PhoneIcon /></IconButton>
                  <IconButton><MoreVert/></IconButton>
               </div>
           </div>
           <div className="chat__body">
           {messages.map((message)=>(
                    <p className={`chat__message ${message.name===user.displayName && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
                    {message.message}
                  <span className="chat__timestamp">
                     {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>   
                </p>
   
           ))}
         
            
           </div>
           <div className="chat__footer">
               <IconButton><InsertEmoticonIcon /></IconButton>
               <IconButton><AttachFile /></IconButton>
               
               <form>
                   <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a Message...."/> 
                   <button  type="submit" onClick={sendMessage}><SendIcon /></button>
                </form>
                <IconButton><MicIcon /></IconButton>
                

           </div>

        </div>
    )
}

export default Chat
