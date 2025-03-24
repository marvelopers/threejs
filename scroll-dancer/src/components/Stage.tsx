import React, { useRef } from "react";
import { Box, Circle, ScrollControlsState } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "../constants/colors";
import { useStore } from "../stores";
import { useFrame } from "@react-three/fiber";

export const Stage = () => {
  const { isEntered } = useStore();
  const boxRef = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (!isEntered) return;

    if (boxRef.current && boxRef.current?.material) {
      if (boxRef.current.material instanceof THREE.MeshStandardMaterial) {
        boxRef.current.material.color = new THREE.Color(colors.darkBlue);
      }
    }
  });

  return (
    <>
      <Box ref={boxRef} position={[0, 0, 0]} args={[100, 100, 100]}>
        <meshStandardMaterial color={colors.blue} side={THREE.DoubleSide} />
      </Box>
      <Circle
        castShadow
        receiveShadow
        args={[8, 8, 8]}
        rotation-x={-Math.PI / 2}
        position-y={-Math.PI / 2}
      >
        <meshStandardMaterial
          color={colors.midnightBlue}
          side={THREE.DoubleSide}
        />
      </Circle>
    </>
  );
};
