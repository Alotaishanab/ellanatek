import React from 'react';
import '@google/model-viewer';

const BoxModel = () => (
  <model-viewer
    src="/BoxCentered.glb" // Assuming BoxCentered.glb is in the public folder
    camera-controls
    interaction-prompt="none" // Disable interaction prompt
    disable-zoom // Disable zoom
    className="box-model"
    style={{ width: '731px', height: '541px' }} // Set desired initial view
  ></model-viewer>
);

export default BoxModel;
