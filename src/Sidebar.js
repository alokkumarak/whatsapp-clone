import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {  SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import {useStateValue} from './StateProvider';

function Sidebar() {
    const [groups,setGroups]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(() => {
      const unsubscribe= db.collection('groups').onSnapshot((snapshot)=>
           setGroups(snapshot.docs.map((doc)=>({
               id:doc.id,
               data:doc.data(),
           }))
         )
       );

       return()=>{
           unsubscribe();
       }
    }, []);

    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+"...":str;
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
              <IconButton>
              <Avatar 
                src={user?.photoURL} 
                alt=""                 
              />
              </IconButton> 
               <div className="sidebar__headerRight">
                   <IconButton ><DonutLargeIcon 
                      className="sidebar__Icons"
                   /></IconButton>
                  <IconButton><ChatIcon 
                  className="sidebar__Icons"
                       /></IconButton>
                  <IconButton><MoreVertIcon 
                     className="sidebar__Icons"
                  /></IconButton>

               </div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchOutlined />
                <input type="text" placeholder="search or new chat" />
                </div>
             
            </div>
            <div className="sidebar__chats">
            <IconButton><SidebarChat addNewChat/></IconButton>    

              {groups.map((group)=>(
                  <IconButton><SidebarChat key={group.id} id={group.id} name={group.data.name} /></IconButton>
              ))}
          
      
                
                
               
    
            </div>
        </div>
    )
}

export default Sidebar
