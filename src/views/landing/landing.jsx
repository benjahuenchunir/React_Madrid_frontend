import './landing.scss';
import TitleGroup from "./components/titleGroup.jsx";
import FeatureGroup from "./components/featureGroup.jsx";

const Landing = () => {

  return (
    <div id="landing-container">
      <div className="content-container">
        <div className="hero-container">
          <TitleGroup/>
          <div className="logo-container hide-on-tablet">
          </div>
        </div>
        <img src="/shipsstatic.svg" alt="Ships soaring through sky" className="fixed-top-right hide-on-tablet"/>
      </div>
      <FeatureGroup/>
      <div className="ship-container">
        <img src="/ground_ship.svg" alt="Ship on ground" className="fixed-bottom"/>
      </div>
    </div>
  )
};

export default Landing;
