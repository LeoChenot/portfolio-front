import React from 'react';

// import PropTypes from 'prop-types';
import './style.scss';

function Home() {
  return (
    <div className="home">
      <div id="presentation" className="section">presentation</div>
      <div id="projects" className="section">projects</div>
      <div id="contact" className="section">contact</div>
      <div id="test" className="section">test</div>
    </div>
  );
}

Home.propTypes = {

};

export default Home;
