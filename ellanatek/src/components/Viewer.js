// src/components/Viewer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import '../styles/Viewer.css';

const Viewer = ({ modelPath }) => {
  return (
    <Canvas className="canvas-container">
      <ambientLight intensity={1.0} />
      <directionalLight position={[2, 2, 5]} intensity={1.0} />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={true} />
    </Canvas>
  );
};

export default Viewer;
