/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import './style.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__information">

        <div className="footer__information__column">
          <div className="footer__information__column__title">Portfolio</div>
          <div className="footer__information__column__content">
            Voici mon portfolio, il contient une liste de mes projets personnels ainsi que le moyen de me contacter.
          </div>
        </div>
        <div className="footer__information__column">
          <div className="footer__information__column__title">Liens utiles</div>
          <div className="footer__information__column__content">
            <div className="footer__information__column__content__links">
              <Link className="footer__information__column__content__links__link" to="/home">Accueil</Link>
              <Link className="footer__information__column__content__links__link" to="/home#presentation">Présentation</Link>
              <Link className="footer__information__column__content__links__link" to="/home#projects">Mes projets</Link>
              <Link className="footer__information__column__content__links__link" to="/home#contact">Contact</Link>
            </div>
          </div>
        </div>

      </div>
      <div className="footer__copyright">
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Copyright: leochenot.com
      </div>
    </footer>
  );
}

Footer.propTypes = {

};

export default Footer;
