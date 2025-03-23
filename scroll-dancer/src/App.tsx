import React from "react";
import styled from "styled-components";
import { MainCanvas } from "./components/MainCanvas";

function App() {
  return (
    <Wrapper>
      <MainCanvas />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
