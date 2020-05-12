import React, { useContext } from "react";
import { GlobalState } from '../../App'
import Swal from "sweetalert2";
import socket from "../../socket";
import Button from "@material-ui/core/Button";
import { StyledPaper, StyledForm, StyledInput } from "../../style";
import {ChatRoom} from '../chatRoom/chatRoom'

export const JoinBlock = props => {
  
  const { state, dispatch } = useContext(GlobalState);

  const {roomId, userName} = state;

  const formSubmit = (e) => {
    e.preventDefault();
    if(state.userName !== '' && state.roomId !== ''){
      dispatch({
        type: 'LOGIN'
      })
    } else {
      Swal.fire({
        title: "Error!",
        text: "Room ID and Name need to be filled.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
    {
      !state.isLogIn ? <StyledPaper elevation={3}>
      <StyledForm
        onSubmit={(e) => {
          formSubmit(e)
          socket.emit("joinRoom", {roomId, userName});
        }}
      >
        <StyledInput
          type="text"
          placeholder="Room ID"
          onChange={(e) => {
            dispatch({
              type: 'ADD_ROOMID',
              payload: e.target.value,
            })
          }}
        />
        <StyledInput
          type="text"
          className="name"
          placeholder="Your Name"
          onChange={(e) => {
            dispatch({type: 'ADD_USERNAME',
            fieldName: 'userName',
            payload: e.target.value,
          })
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          GO!
        </Button>
      </StyledForm>
    </StyledPaper> : <ChatRoom />
    }
    </>
  );
}
