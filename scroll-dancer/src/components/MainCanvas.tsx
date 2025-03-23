import { Box, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { colors } from "../constants/colors";
import { Dancer } from "./Dancer";
import { Loader } from "./Loader";
import { useStore } from "../stores";

export const MainCanvas = () => {
  const { isEntered } = useStore();

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
      <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
        <Suspense fallback={<Loader isCompleted={false} />}>
          <Dancer />
        </Suspense>
      </ScrollControls>
      <OrbitControls />
    </Canvas>
  );
};

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
