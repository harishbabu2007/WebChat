import React, { useState, useEffect } from "react";
import "./styles/Sidebar.css";
import { useAuth } from "../contexts/AuthContext";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";
import { auth } from "../firebase";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Input,
  InputLabel,
  Button,
} from "@material-ui/core";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([{}]);
  const [modalStyle] = useState(getModalStyle);
  const [text, setText] = useState("");
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [openEdit, setOpenEdit] = useState();
  const [textEdit, setTextEdit] = useState("");

  const addChannel = () => {
    db.collection("channels").add({
      name: text,
      by: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
    setOpen(false);
  };

  const editUsername = () => {
    if (textEdit.trim()) {
      auth.currentUser.updateProfile({
        displayName: textEdit,
      });
      setOpenEdit(false);
      setTextEdit("");
    }
  };

  useEffect(() => {
    db.collection("channels")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((item) => ({
            name: item.data().name,
            by: item.data().by,
            id: item.id,
          }))
        );
      });
  }, []);

  return (
    <React.Fragment>
      <Modal open={open}>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ marginBottom: "20px" }}>Add Channel</h1>
          <InputLabel>channel name</InputLabel>
          <Input
            style={{ fontSize: "20px", marginBottom: "20px" }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            onClick={(e) => addChannel()}
            color="primary"
            style={{ marginRight: "10px" }}
            disabled={!text.trim()}
          >
            Add Channel
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => setOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal open={openEdit}>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ marginBottom: "20px" }}>Edit Username</h1>
          <InputLabel>Enter new username</InputLabel>
          <Input
            style={{ fontSize: "20px", marginBottom: "20px" }}
            type="text"
            value={textEdit}
            onChange={(e) => setTextEdit(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            onClick={(e) => editUsername()}
            color="primary"
            style={{ marginRight: "10px" }}
            disabled={!textEdit.trim()}
          >
            Edit Name
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => setOpenEdit(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar__by">
          <h1>Web Chat</h1>
          <p> by harish</p>
        </div>
        <br />
        <h3 style={{ color: "lightgreen" }}> ⬅ Swipe To close sidebar</h3>
        <h3 style={{ color: "lightgreen" }}>or tap empty area</h3>
        <div className="sidebar__userinfo">
          <h2 className="sidebar__name">Welcome {currentUser.displayName}</h2>
          <IconButton
            onClick={() => setOpenEdit(true)}
            style={{ color: "white" }}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        </div>
        <div className="sidebar__online">
          <p>{currentUser.email}</p>
          <div style={{ color: "lightgreen", paddingTop: "7px" }}>
            <FiberManualRecordIcon />
          </div>
          <p>Online</p>
        </div>
        <hr />
        <div className="sidebar__channel">
          <h3>Channels</h3>
          <IconButton style={{ color: "white" }} onClick={(e) => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </div>
        <div className="sidebar__channels">
          <List>
            {channels.map((ch) => (
              <Link
                to={`/channel/${ch.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem button>
                  <ListItemText>
                    # {ch.name} ({ch.by})
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
