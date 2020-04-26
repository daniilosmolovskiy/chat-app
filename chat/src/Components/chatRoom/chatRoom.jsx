import React, { useState } from "react";
import Swal from "sweetalert2";
import socket from "../../socket";
import Button from "@material-ui/core/Button";
import {
  StyledPaper,
  StyledChatForm,
  StyledChatInput,
  MessageContainer,
  MessageInfoContainer,
  MessageText,
} from "../../style";

export const ChatRoom = props => {
  const [names, setNames] = useState([""]);
  const [message, setMessage] = useState("");

  socket.on("message", (message) => {
    setNames([...names, message]);
  });

  const submitMessage = () => {
    if (message !== "") {
      socket.emit("message", message);
    } else {
      Swal.fire({
        title: "Error!",
        text: "You need to input a message",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setMessage("");
    socket.emit("chatMessage", message);
  };

  return (
    <StyledPaper>
      {names.map((message, i) => {
        return (
          <MessageContainer key={i}>
            <MessageInfoContainer>
              <MessageText>{message.username}</MessageText>
              <MessageText>{message.time}</MessageText>
            </MessageInfoContainer>
            <MessageText>{message.text}</MessageText>
          </MessageContainer>
        );
      })}
      <StyledChatForm
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <StyledChatInput
          placeholder="Input message here.."
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </StyledChatForm>
    </StyledPaper>
  );
}
