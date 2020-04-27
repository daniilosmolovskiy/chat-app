import React, { useReducer } from "react";
import socket from "../../socket";
import Button from "@material-ui/core/Button";
import { StyledPaper, StyledForm, StyledInput } from "../../style";
import { initialState, reducer } from "../../Reducer/reducer";

export const JoinBlock = props => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const {roomId, userName} = state;

  const formSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/chat?username=${state.userName}&room=${state.roomId}`);
  };

  return (
    <StyledPaper elevation={3}>
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
    </StyledPaper>
  );
}
