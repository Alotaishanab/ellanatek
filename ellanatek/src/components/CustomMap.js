import mapImage from '../assets/mao.png';
import '../styles/CustomMap.css';

export default function CustomMap() {
  return (
    <div className="map-container">
      <div className="map-image-wrapper">
        <img
          src={mapImage}
          alt="Custom Map"
          className="map-image"
        />
      </div>
    </div>
  );
}