import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import {
  getUsers,
  countNewMessages,
  findChatMessages,
  findChatMessage,
} from "../util/AppUtil";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  loggedInUser,
  chatActiveContact,
  chatMessages,
} from "../atom/globalState";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import { getAllUsers } from "../../../AuthService";
import Cookies from "js-cookie";
import { Avatar, Container, Grid, Stack, Typography } from "@mui/material";
import { establishConnection } from "../../../ChatService";

var stompClient = null;
const Chat = (props) => {
  const currentUser = useState({id:localStorage.getItem('id'),
name:localStorage.getItem('name'),
role:localStorage.getItem('role')});
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);

  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useRecoilState(chatMessages);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      props.history.push("/admin-signin");
    }
    connect();
    loadContacts();
    
    console.log(contacts.data);
  }, []);

  useEffect(()=>{

    setActiveContact(contacts[0]);
  },[])

  useEffect(() => {
    if (activeContact === undefined) return;
    findChatMessages(activeContact.id, localStorage.getItem('id')).then((msgs) =>
      setMessages(msgs)
    );
    loadContacts();
  }, [activeContact]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    const token = Cookies.get('token');
    SockJS = new SockJS(`http://localhost:8085/ws`);
    var headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // SockJS = new  SockJS(establishConnection())
   
    stompClient = Stomp.over(SockJS);
    stompClient.connect({headers}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
    console.log(currentUser);
    stompClient.subscribe(
      "/user/" + currentUser.id + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
      .chatActiveContact;

    if (active.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
          .chatMessages;
        newMessages.push(message);
        setMessages(newMessages);
      });
    } else {
      message.info("Received a new message from " + notification.senderName);
    }
    loadContacts();
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: currentUser.id,
        recipientId: activeContact.id,
        senderName: currentUser.name,
        recipientName: activeContact.name,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

  const loadContacts = async() => {

    const response = await getAllUsers();

    setContacts(response.data);

    
    
    console.log(response.data);


    const promise = await getAllUsers();

    contacts.map((contact) =>
     
    countNewMessages(contact.id, localStorage.getItem('id')).then((count) => {
    
      contact.newMessages = count;
      return contact;
    })
  )

    
    
     
      
   

    // promise.then((promises) =>
    //   Promise.all(promises).then((users) => {
    
    //     if (activeContact === undefined && users.length > 0) {
    //       setActiveContact(users[0]);
    //     }
    //   })
    // );
  };

  return (
   <div style={{backgroundColor:'white'}}>
<Container sx={{padding:'50px'}}>
<Grid>


<div id="frame">
         
         <div id="sidepanel">
           <div id="profile">
             <div class="wrap">
                <Stack direction={'row'}>
             <Avatar
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          
          sx={{
           
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
         <Typography sx={{width:'100%'}}> {localStorage.getItem('name')}</Typography>
         </Stack>
            
               <div id="status-options">
                 <ul>
                   <li id="status-online" class="active">
                     <span class="status-circle"></span> <p>Online</p>
                   </li>
                   <li id="status-away">
                     <span class="status-circle"></span> <p>Away</p>
                   </li>
                   <li id="status-busy">
                     <span class="status-circle"></span> <p>Busy</p>
                   </li>
                   <li id="status-offline">
                     <span class="status-circle"></span> <p>Offline</p>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
           <div id="search" />
           <div id="contacts">
             <ul>
               {contacts.map((contact) => (
                 <li
                   onClick={() => setActiveContact(contact)}
                   class={
                     activeContact && contact.id === activeContact.id
                       ? "contact active"
                       : "contact"
                   }
                 >
                   <div class="wrap">
                  
                     <span class="contact-status online"></span>
                     <Avatar
             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
             
             sx={{
              
               border: (theme) => `solid 2px ${theme.palette.background.default}`,
             }}
           />
                     <div class="meta">
                       <p class="name">{contact.name}</p>
                       {contact.newMessages !== undefined &&
                         contact.newMessages > 0 && (
                           <p class="preview">
                             {contact.newMessages} new messages
                           </p>
                         )}
                     </div>

                     
                   </div>
                 </li>
               ))}
             </ul>
           </div>
           <div id="bottom-bar">
             <button id="addcontact">
               <i class="fa fa-user fa-fw" aria-hidden="true"></i>{" "}
               <span>Profile</span>
             </button>
             <button id="settings">
               <i class="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
               <span>Settings</span>
             </button>
           </div>
         </div>
         <div class="content">
           <div class="contact-profile">
             <img src={activeContact && activeContact.profilePicture} alt="" />
             <p>{activeContact && activeContact.name}</p>
           </div>
           <ScrollToBottom className="messages">
             <ul>
               {messages.map((msg) => (
                 <li class={msg.senderId === currentUser.id ? "sent" : "replies"}>
                   {msg.senderId !== currentUser.id && (
                      <Avatar
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      
                      sx={{
                       
                        border: (theme) => `solid 2px ${theme.palette.background.default}`,
                      }}/>
                   )}
                   <p>{msg.content}</p>
                 </li>
               ))}
             </ul>
           </ScrollToBottom>
           <div class="message-input">
             <div class="wrap">
               <input
                 name="user_input"
                 size="large"
                 placeholder="Write your message..."
                 value={text}
                 onChange={(event) => setText(event.target.value)}
                 onKeyPress={(event) => {
                   if (event.key === "Enter") {
                     sendMessage(text);
                     setText("");
                   }
                 }}
               />
   
               <Button
                 icon={<i class="fa fa-paper-plane" aria-hidden="true"></i>}
                 onClick={() => {
                   sendMessage(text);
                   setText("");
                 }}
               />
             </div>
           </div>
         </div>
       </div>
       </Grid>

</Container>


   </div>
   
  );
};

export default Chat;