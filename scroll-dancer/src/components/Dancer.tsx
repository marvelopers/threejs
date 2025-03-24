import {
  PositionalAudio,
  useAnimations,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "./Loader";
import { useStore } from "../stores";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import { colors } from "../constants/colors";
import { StarPoints } from "./StarPoints";
import { Stage } from "./Stage";
import { Light } from "./Light";

let timeline: gsap.core.Timeline;

export const Dancer = () => {
  const dancerRef = useRef<THREE.Object3D | null>(null);

  const { scene, animations } = useGLTF("/models/dancer.glb");

  const [currentAnimation, setCurrentAnimation] = useState(
    "breakdanceFootworkToIdle"
  );
  const [rotateFinished, setRotateFinished] = useState(false);

  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();
  const three = useThree();
  const { isEntered } = useStore();

  useFrame(() => {
    if (!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
    if (rotateFinished) {
      setCurrentAnimation("breakdancingEnd");
    } else {
      setCurrentAnimation("wave");
    }
  });

  useEffect(() => {
    if (!isEntered) return;
    three.camera.lookAt(1, 2, 0);
    actions["wave"]?.play();
    three.scene.background = new THREE.Color(colors.darkBlue);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [actions, isEntered, scene, three.camera, three.scene]);

  useEffect(() => {
    let timeout;
    if (currentAnimation === "wave") {
      actions[currentAnimation]?.reset().fadeIn(0.5).play();
    } else {
      actions[currentAnimation]
        ?.reset()
        .fadeIn(0.5)
        .play()
        .setLoop(THREE.LoopOnce, 1);

      timeout = setTimeout(() => {
        if (actions[currentAnimation]) {
          actions[currentAnimation].paused = true;
        }
      }, 8000);
    }
    return () => {
      clearTimeout(timeout);
      actions[currentAnimation]?.reset().fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation, scroll.offset]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    gsap.fromTo(
      three.camera.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      {
        duration: 2.5,
        x: 12,
        y: 6,
        z: 12,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI,
      },
      {
        duration: 2.5,
        z: 0,
      }
    );

    gsap.fromTo(
      colors,
      { boxMaterialColor: colors.black },
      {
        duration: 2.5,
        boxMaterialColor: colors.white,
      }
    );
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if (!dancerRef.current) return;
    const pivot = new THREE.Group();
    pivot.position.copy(dancerRef.current.position);
    pivot.add(three.camera);
    three.scene.add(pivot);
    timeline = gsap.timeline();
    timeline
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: Math.PI,
        },
        0.5
      )
      .from(
        dancerRef.current.position,
        {
          duration: 4,
          x: 3,
        },
        "<"
      )
      .to(
        three.camera.position,
        {
          duration: 10,
          x: 2,
          z: 8,
        },
        "<"
      )
      .to(
        colors,
        {
          duration: 10,
          boxMaterialColor: colors.black,
        },

        "<"
      )
      .to(pivot.rotation, {
        duration: 10,
        y: Math.PI,
      })
      .to(
        three.camera.position,
        {
          duration: 10,
          x: -4,
          z: 12,
        },
        "<"
      )
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      })
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 16,
        onUpdate: () => {
          setRotateFinished(false);
        },
      })
      .to(
        pivot.rotation,
        {
          duration: 15,
          y: Math.PI * 4,
          onUpdate: () => {
            setRotateFinished(true);
          },
        },
        "<"
      )
      .to(
        colors,
        {
          duration: 15,
          boxMaterialColor: colors.red,
        },
        "<"
      );

    return () => {
      three.scene.remove(pivot);
    };
  }, [isEntered, three.camera, three.scene]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    timeline = gsap.timeline();
    timeline.from(
      dancerRef.current?.rotation,
      {
        duration: 4,
        y: Math.PI,
      },
      0.5
    );
  }, [isEntered]);

  if (!isEntered) return <Loader isCompleted />;

  return (
    <>
      <primitive ref={dancerRef} object={scene} scale={0.02} />
      <Light />
      <Stage />
      <StarPoints />
      <PositionalAudio
        position={[-24, 0, 0]}
        autoplay
        url="/music/zen.mp3"
        distance={50}
        loop
      />
    </>
  );
};
