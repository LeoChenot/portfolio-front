/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

// import PropTypes from 'prop-types';
import './style.scss';

function Resume() {
  const openResume = () => {
    window.open('https://drive.google.com/u/1/uc?id=108XrOrQp_6h3SzeLxHjbVAQ6rA1YdGux&export?format=pdf');
  };

  return (
    <section id="resume" className="section">
      <h2 className="title">Mon CV</h2>
      <div className="content">
        <div className="content__resume">
          <div className="content__resume__content" onClick={openResume}>
            <embed
              className="content__resume__content__pdf"
              src="https://drive.google.com/u/1/uc?id=108XrOrQp_6h3SzeLxHjbVAQ6rA1YdGux&export?format=pdf#toolbar=0&zoom=50"
              type="application/pdf"
              width="407px"
              height="570px"
            />
          </div>
          <div className="content__resume__actions">
            <a href="https://drive.google.com/u/1/uc?id=108XrOrQp_6h3SzeLxHjbVAQ6rA1YdGux&export?format=pdf" target="_blank" className="content__resume__actions__link" rel="noreferrer">Voir en détails</a>
            <a href="https://drive.google.com/u/1/uc?id=108XrOrQp_6h3SzeLxHjbVAQ6rA1YdGux&export=download" className="content__resume__actions__link">Télécharger</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Resume.propTypes = {

};

export default Resume;
