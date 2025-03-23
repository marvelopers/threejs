import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import React, { use, useEffect, useRef } from "react";
import { Loader } from "./Loader";
import { useStore } from "../stores";

export const Dancer = () => {
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");

  const { actions } = useAnimations(animations, dancerRef);
  const dd = useScroll();

  const { isEntered } = useStore();

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"]?.play();
  }, [actions, isEntered]);

  if (!isEntered) return <Loader isCompleted />;

  return (
    <>
      <ambientLight intensity={2} />
      <primitive ref={dancerRef} object={scene} scale={0.05} />
    </>
  );
};
