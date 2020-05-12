import React, { useReducer, createContext } from "react";
import Container from "@material-ui/core/Container";
import { JoinBlock } from "./Components/joinBlock/joinBlock";
import { initialState, reducer } from "./Reducer/reducer";

export const GlobalState = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Container maxWidth="sm">
        <JoinBlock />
      </Container>
    </GlobalState.Provider>
  );
}

export default App;
