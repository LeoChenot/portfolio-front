import React from 'react';
import Contact from '../Contact';
import Presentation from '../Presentation';
import Projects from '../Projects';

// import PropTypes from 'prop-types';
import './style.scss';

function Home() {
  return (
    <div className="home">
      <Presentation />
      <Projects />
      <Contact />
    </div>
  );
}

Home.propTypes = {

};

export default Home;
