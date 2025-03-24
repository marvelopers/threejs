import React from "react";
import { useRef } from "react";

export const Light = () => {
  const hemisphereLightRef = useRef(null);
  const rectAreaLightRef = useRef(null);

  return (
    <>
      <ambientLight intensity={2} />
      <rectAreaLight
        ref={rectAreaLightRef}
        position={[0, 10, 0]}
        intensity={30}
      />
      <pointLight
        position={[0, 5, 0]}
        intensity={45}
        castShadow
        receiveShadow
      />
      <hemisphereLight
        ref={hemisphereLightRef}
        position={[0, 5, 0]}
        intensity={0}
        groundColor={"lime"}
        color={"yellow"}
      />
    </>
  );
};
