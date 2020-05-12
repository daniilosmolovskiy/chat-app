import React, { useContext, useEffect } from "react";
import { GlobalState } from '../../App'
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
  StyledChatHeader
} from "../../style";

export const ChatRoom = (props) => {
  
  const { state, dispatch } = useContext(GlobalState);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message)
      dispatch({
        type: "ADD_MESSAGE",
        payload: message,
      });
    });
  }, [dispatch])

  const submitMessage = () => {
    if (state.message !== '') {
      socket.emit("chatMessage", state.message);
    } else {
      Swal.fire({
        title: "Error!",
        text: "You need to input a message",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    dispatch({ type: "CLEAR_CURRENT_MESSAGE" });
  };

  return (
    <StyledPaper>
      <StyledChatHeader>{state.roomId} room</StyledChatHeader>
      {state.roomMessages ? state.roomMessages.map((message, i) => {
        return (
          <MessageContainer key={i}>
            <MessageInfoContainer>
              <MessageText>{message.username}</MessageText>
              <MessageText>{message.time}</MessageText>
            </MessageInfoContainer>
            <MessageText>{message.text}</MessageText>
          </MessageContainer>
        );
      }) : null}
      <StyledChatForm
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <StyledChatInput
          placeholder="Input message here.."
          type="text"
          value={state.message}
          onChange={(e) => {
            dispatch({
              type: "CURRENT_MESSAGE",
              payload: e.target.value,
            });
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </StyledChatForm>
    </StyledPaper>
  );
};
