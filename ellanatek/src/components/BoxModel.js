import React from 'react';
import '@google/model-viewer';


const BoxModel = () => (
  <model-viewer
      src="/BoxCentered.glb"
      camera-controls
      interaction-prompt="none"
      disable-zoom
      className="box-model"
      style={{ width: '600px', height: '800px' }}
  ></model-viewer>
);

export default BoxModel;
