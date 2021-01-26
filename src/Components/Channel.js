import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeaderSidebar from "./HeaderSidebar";
import { db } from "../firebase";
import {
  TextField,
  Button,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import "./styles/Channel.css";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";

function Channel() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("channels")
      .doc(id)
      .get("name")
      .then((snap) => setName(snap.data().name));
  }, [id]);

  useEffect(() => {
    db.collection(id)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            messageSent: doc.data().message,
            by: doc.data().by,
          }))
        );
      });
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      db.collection(id).add({
        message: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        by: currentUser.displayName,
      });
      setText("");
    }
  };

  return (
    <div>
      <HeaderSidebar />
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      <List>
        {messages.map((item) => {
          return (
            <>
              <ListItem>
                <ListItemText
                  primary={<h2>{item.messageSent}</h2>}
                  secondary={item.by}
                />
              </ListItem>
              <br />
              <br />
            </>
          );
        })}
      </List>
      <div className="channel__input">
        <TextField
          label="Send a message"
          placeholder="eg: how are you..?"
          fullWidth
          variant="outlined"
          color="primary"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          disabled={!text.trim()}
          style={{
            marginRight: "20px",
            color: "#7d3c98",
            marginLeft: "10px",
          }}
          onClick={() => sendMessage()}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

export default Channel;
