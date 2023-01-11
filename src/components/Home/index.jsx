import React from 'react';
import Presentation from '../Presentation';
import Projects from '../Projects';

// import PropTypes from 'prop-types';
import './style.scss';

function Home() {
  return (
    <div className="home">
      <Presentation />
      <Projects />
      <div id="contact" className="section">contact</div>
    </div>
  );
}

Home.propTypes = {

};

export default Home;
