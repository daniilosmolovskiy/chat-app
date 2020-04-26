import React from "react";
import Container from "@material-ui/core/Container";
import { JoinBlock } from "./Components/joinBlock/joinBlock";
import {ChatRoom} from "./Components/chatRoom/chatRoom";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="sm">
      {/* <JoinBlock />
      <ChatRoom /> */}
      <Switch>
        <Route path="/chat/" component={ChatRoom} />
        <Route path="" exact component={JoinBlock} />
      </Switch>
    </Container>
  );
}

export default App;
