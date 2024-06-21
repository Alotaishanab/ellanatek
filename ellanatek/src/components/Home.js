import React from 'react';
import Viewer from './Viewer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <Viewer modelPath="/rusty_motorbike.glb" />
    </div>
  );
};

export default Home;
