import React, { useState } from "react";
import socket from "../../socket";
import Button from "@material-ui/core/Button";
import { StyledPaper, StyledForm, StyledInput } from "../../style";

export const JoinBlock = props => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/chat?username=${userName}&room=${roomId}`);
  };

  return (
    <StyledPaper elevation={3}>
      <StyledForm
        onSubmit={(e) => {
          formSubmit(e)
          socket.emit("joinRoom", {userName, roomId});
        }}
      >
        <StyledInput
          type="text"
          placeholder="Room ID"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
        <StyledInput
          type="text"
          className="name"
          placeholder="Your Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          GO!
        </Button>
      </StyledForm>
    </StyledPaper>
  );
}
