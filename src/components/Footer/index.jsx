/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import './style.scss';

function Footer() {
  const [navLinks, setNavLinks] = useState([]);

  const getNavLinks = () => {
    const navItems = [...document.querySelector('.header__right__nav__list').children];
    const navLinksTemp = navItems.map((item) => {
      const link = item.querySelector('.header__right__nav__list__item__link');
      const itemData = {
        name: link.textContent,
        url: link.getAttribute('href'),
      };
      return itemData;
    });
    setNavLinks(navLinksTemp);
  };

  useEffect(() => {
    getNavLinks();
  }, []);

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
              {navLinks.map((link) => (
                <Link
                  className="footer__information__column__content__links__link"
                  key={link.name}
                  to={link.url}
                >
                  {link.name}

                </Link>
              ))}
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
