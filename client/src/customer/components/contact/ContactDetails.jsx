import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import Message from "./Item";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const ContactDetails = ({ userId }) => {
  const auth = useContext(authContext);
  const ENDPOINT = "http://localhost:8000";
  const socket = socketIOClient(ENDPOINT);
  const [conversation, setConversation] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState();

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  useEffect(() => {
    if (auth?.currentUser?.role.toLowerCase() == "admin") {
      
      setRoomId(userId);
    } else {
      setRoomId(auth?.currentUser?._id);
     
    }
    if (!connected) {
      if (roomId) {
        socket.emit("connect_room", roomId);
        setConnected(true);
      }
    }
    socket.emit("initial", roomId);
    const handleInitialChat = (data) => {
      setConversation(data);
    };
    socket.on("initial_chat", handleInitialChat);

    return () => {
      socket.off("initial_chat", handleInitialChat);
      socket.off("connect_room")
    };
  }, [auth?.currentUser?._id,socket]);

  const handleSendMessage = async () => {
    if (textFieldValue.trim() === "") {
      return toast.warning("You can't send an empty message");
    }

    socket.emit("send_message", {
      send: auth?.currentUser?._id,
      userId: roomId,
      message: textFieldValue,
    });
    setTextFieldValue("");
  };

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      window.alert(data.role);
      setConversation([...conversation, data]);
    };

    socket.on("get_message", handleReceivedMessage);

    return () => {
      socket.off("get_message", handleReceivedMessage);
    };
  }, [conversation]);
  return (
    <div className="z-100 flex flex-col items-center justify-center h-[100%] bg-white">
      {console.log(userId)}
      {console.log("room", roomId)}
      <>
        <div className="bg-blue-600 rounded-md w-[100%] flex flex-col justify-center items-center">
          <SupportAgentIcon
            sx={{ fontSize: "2.5rem" }}
            className="font-bold text-center"
          />
          <h2 className="text-4xl font-bold text-center">Contact Details</h2>
          <p className="text-center">
            You can give us your Your question and We will answer You
          </p>
        </div>
        <div className="w-[100%]">
          <Box
            sx={{
              width: "100%",
              height: "40vh",
              paddingY: "3%",
              borderRadius: "10px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              bgcolor: "#ffffff",
            }}
          >
            {conversation?.map((item, i) => (
              <Message key={i} role={item.role} message={item.message} />
            ))}
          </Box>
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "auto",
              position: "relative",
            }}
          >
            <TextField
              className="w-full"
              label="Your Message"
              variant="outlined"
              style={{ marginTop: "1rem" }}
              onChange={handleTextFieldChange}
              value={textFieldValue}
            />
            <IconButton
              sx={{
                position: "absolute",
                padding: 0,
                background: "none",
                color: "black",
                right: "1%",
                top: "48%",
              }}
              onClick={handleSendMessage}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </>
    </div>
  );
};

export default ContactDetails;
