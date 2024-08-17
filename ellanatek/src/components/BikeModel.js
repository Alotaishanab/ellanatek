import React from 'react';
import '@google/model-viewer';

const BikeModel = () => (
  <model-viewer
    src="/Biker.glb" // Assuming Bike.glb is in the public folder
    camera-controls
    interaction-prompt="none" // Disable interaction prompt
    disable-zoom // Disable zoom
    className="bike-model"
    style={{ width: '470px', height: '600px' }}
    camera-orbit="45deg 75deg 5m" // Zoom out the initial view
  ></model-viewer>
);

export default BikeModel;
