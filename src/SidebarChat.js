import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      const msgColl = query(
        collection(db, "rooms", id, "messages"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(msgColl, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((msg) => msg.data()));
      });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter room name");

    if (roomName) {
      const collectionRef = collection(db, "rooms");
      const payload = { name: roomName };
      await addDoc(collectionRef, payload);
    }
  };

  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat__info'>
          <h2 className='sidebarChat__roomName'>{name}</h2>
          <p className='sidebarChat__lastMessage'>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      Add New Chat
    </div>
  );
}

export default SidebarChat;
