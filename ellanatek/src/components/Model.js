// src/components/Model.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  console.log('Loaded scene:', scene);

  return <primitive object={scene} />;
};

export default Model;
