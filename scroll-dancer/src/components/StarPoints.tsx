import React, { useEffect, useMemo, useRef } from "react";
import { Points, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { colors } from "../constants/colors";
import { useStore } from "../stores";

export const StarPoints = () => {
  const texture = useTexture("/textures/5.png");

  const { isEntered } = useStore();

  const starGroupRef01 = useRef(null);
  const starGroupRef02 = useRef(null);
  const starGroupRef03 = useRef(null);

  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return { positions };
  }, []);

  useEffect(() => {
    if (!isEntered) return;

    gsap.fromTo(
      colors,
      { boxMaterialColor: colors.black },
      {
        duration: 2.5,
        boxMaterialColor: colors.red,
      }
    );

    gsap.to(starGroupRef01.current, {
      yoyo: true,
      duration: 2,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef02.current, {
      yoyo: true,
      duration: 3,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef03.current, {
      yoyo: true,
      duration: 4,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });
  }, [isEntered]);

  return (
    <>
      <Points positions={positions.slice(0, positions.length / 3)}>
        <pointsMaterial
          ref={starGroupRef01}
          size={0.5}
          color={new THREE.Color(colors.cyan)}
          sizeAttenuation
          depthWrite
          alphaMap={texture}
          transparent
          alphaTest={0.001}
        />
      </Points>
      <Points
        positions={positions.slice(
          positions.length / 3,
          (positions.length * 2) / 3
        )}
      >
        <pointsMaterial
          ref={starGroupRef02}
          size={0.5}
          color={new THREE.Color(colors.cyan)}
          sizeAttenuation
          depthWrite
          alphaMap={texture}
          transparent
          alphaTest={0.001}
        />
      </Points>
      <Points positions={positions.slice((positions.length * 2) / 3)}>
        <pointsMaterial
          ref={starGroupRef03}
          size={0.5}
          color={new THREE.Color(colors.green)}
          sizeAttenuation
          depthWrite
          alphaMap={texture}
          transparent
          alphaTest={0.001}
        />
      </Points>
    </>
  );
};
