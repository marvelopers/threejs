import React, { useRef } from "react";
import styled from "styled-components";
import { Scroll } from "@react-three/drei";
import { useStore } from "../stores";

export const MovingDOM = () => {
  const { isEntered } = useStore();
  const article01Ref = useRef<HTMLDivElement | null>(null);
  const article02Ref = useRef<HTMLDivElement | null>(null);
  const article03Ref = useRef<HTMLDivElement | null>(null);
  const article04Ref = useRef<HTMLDivElement | null>(null);
  const article05Ref = useRef<HTMLDivElement | null>(null);
  const article06Ref = useRef<HTMLDivElement | null>(null);
  const article07Ref = useRef<HTMLDivElement | null>(null);
  const article08Ref = useRef<HTMLDivElement | null>(null);

  if (!isEntered) return null;
  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}></ArticleWrapper>
      <ArticleWrapper ref={article02Ref}></ArticleWrapper>
      <ArticleWrapper ref={article03Ref}></ArticleWrapper>
      <ArticleWrapper ref={article04Ref}></ArticleWrapper>
      <ArticleWrapper ref={article05Ref}></ArticleWrapper>
      <ArticleWrapper ref={article06Ref}></ArticleWrapper>
      <ArticleWrapper ref={article07Ref}></ArticleWrapper>
      <ArticleWrapper ref={article08Ref}></ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
  padding: 40px;
`;
