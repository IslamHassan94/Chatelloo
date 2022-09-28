import {
  Add,
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  Send,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
// import firebase from "./firebase";
import Firebase from "firebase/app";
import "firebase/firestore";
import firebase from "./firebase";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      getDoc(doc(db, "rooms", roomId)).then((docSnap) => {
        if (docSnap.exists()) {
          setRoomName(docSnap.data().name);
        } else {
          console.log("No such document!");
        }

        const msgColl = query(
          collection(db, "rooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        );
        onSnapshot(msgColl, (querySnapshot) => {
          setMessages(querySnapshot.docs.map((msg) => msg.data()));
        });
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You Entered >> ", input);

    const msgsRef = collection(db, "rooms", roomId, "messages");
    const newData = {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    };
    addDoc(msgsRef, newData)
      .then((docRef) => {
        console.log("New Document added");
      })
      .catch((err) => {
        console.log(err);
      });
    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className='chat__headerInfo'>
          <h3> {roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__recivier"
            }`}
          >
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timeStamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Write message '
          />
          <IconButton type='submit' hidden onClick={sendMessage}>
            <Send />
          </IconButton>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
