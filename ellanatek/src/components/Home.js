import React from 'react';
import Viewer from './Viewer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="model-viewer">
        <Viewer modelPath="/rusty_motorbike.glb" />
      </div>
      <div className="content">
        <h2>Content Section</h2>
        <p>This is a section of the content that talks about the model above.</p>
      </div>
      <div className="additional-content">
        <h2>More Info</h2>
        <p>Additional details about the model and other relevant information can go here.</p>
      </div>
      <div className="additional-content">
        <h2>Further Details</h2>
        <p>Further information and detailed analysis of the model features.</p>
      </div>
      <div className="additional-content">
        <h2>Conclusion</h2>
        <p>Final thoughts and conclusions on the model.</p>
      </div>
    </div>
  );
};

export default Home;
