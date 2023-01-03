import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home';

// import PropTypes from 'prop-types';
import './style.scss';

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  );
}

Main.propTypes = {

};

export default Main;
