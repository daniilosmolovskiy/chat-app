import React, { useReducer } from "react";
import Swal from "sweetalert2";
import socket from "../../socket";
import Button from "@material-ui/core/Button";
import { initialState, reducer } from "../../Reducer/reducer";

import {
  StyledPaper,
  StyledChatForm,
  StyledChatInput,
  MessageContainer,
  MessageInfoContainer,
  MessageText,
} from "../../style";

export const ChatRoom = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  socket.on("message", (message) => {
    console.log(message);
    dispatch({
      type: "ADD_MESSAGE",
      payload: message,
    });
  });

  const submitMessage = () => {
    if (state.message !== "") {
      socket.emit("message", state.message);
    } else {
      Swal.fire({
        title: "Error!",
        text: "You need to input a message",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    dispatch({ type: "CLEAR_CURRENT_MESSAGE" });
    socket.emit("chatMessage", state.message);
  };

  return (
    <StyledPaper>
      {state.roomMessages.map((message, i) => {
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
