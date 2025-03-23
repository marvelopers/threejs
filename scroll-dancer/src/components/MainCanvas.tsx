import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import styled from "styled-components";
import * as THREE from "three";
import { colors } from "../constants/colors";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="main-canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color(colors.black) }}
    >
      <Box material-color={colors.red}></Box>
    </Canvas>
  );
};

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
