import React, { useReducer, createContext } from "react";
import Container from "@material-ui/core/Container";
import { JoinBlock } from "./Components/joinBlock/joinBlock";
import { ChatRoom } from "./Components/chatRoom/chatRoom";
import { Route, Switch } from "react-router-dom";
import { initialState, reducer } from "./Reducer/reducer";

export const GlobalState = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Container maxWidth="sm">
        <Switch>
          <Route path="/chat/" component={ChatRoom} />
          <Route path="" exact component={JoinBlock} />
        </Switch>
      </Container>
    </GlobalState.Provider>
  );
}

export default App;
