/* eslint-disable max-len */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { ScrollContext } from '../ScrollProvider';

import WhoIAm from '../../assets/WhoIAm.jpg';
import Parcours from '../../assets/Parcours.jpg';
import Competences from '../../assets/Competences.png';

// import PropTypes from 'prop-types';
import './style.scss';

function Presentation() {
  const scrollYContext = useContext(ScrollContext);
  const [scrollY, setScrollY] = useState(undefined);

  const sectionOfPresentationRef = useRef();

  const { currentUrl, headerRef } = useSelector((state) => state.globalReducer);

  const onScroll = () => {
    const scrollYWithoutHeader = scrollY - headerRef.current.offsetHeight;
    const scrollYWithHeader = scrollY + headerRef.current.offsetHeight;

    const middleScrollY = (window.innerHeight - headerRef.current.offsetHeight) / 2;
    const cursorCoord = scrollYWithoutHeader + middleScrollY;

    const boxes = document.querySelectorAll('.content__box');

    const activeBox = [...boxes].find((box) => {
      const bar = box.querySelector('.content__box__main__bar');

      const heightBar = bar.offsetHeight;
      const topBar = bar.offsetTop;
      const bottomBar = topBar + heightBar;

      if (cursorCoord >= topBar && cursorCoord <= bottomBar) {
        return box;
      }

      return null;
    });

    // Pour chaque box...
    boxes.forEach((box) => {
      const bar = box.querySelector('.content__box__main__bar');

      const heightBar = bar.offsetHeight;
      const topBar = bar.offsetTop;
      const bottomBar = topBar + heightBar;

      // Si la box n'est pas active...
      if (box !== activeBox) {
        // Et qu'elle a la classe active...
        if (box.classList.contains('content__box--active')) {
          // Je lui enlève la classe active
          box.classList.remove('content__box--active');
        }

        // Et que le curseur a dépassé la bar...
        if (cursorCoord > bottomBar) {
          if (!box.classList.contains('content__box--exceeded')) {
            // Je lui ajoute la classe exceeded
            box.classList.add('content__box--exceeded');
          }
        }
      }
      // Si la box est active et qu'elle a la classe exceeded
      else if (box.classList.contains('content__box--exceeded')) {
        // Je lui supprime la classe exceeded
        box.classList.remove('content__box--exceeded');
      }
    });

    // Si il y a une box active...
    if (activeBox) {
      // J'ajoute la classe active à la box active
      if (!activeBox.classList.contains('content__box--active')) {
        activeBox.classList.add('content__box--active');
      }
    }

    //
    //
    //
    //
    //
    // Lorsque l'on arrive au début de la section de présentation, on ajoute la classe section--active
    if (scrollYWithHeader < sectionOfPresentationRef.current.offsetTop) {
      if (sectionOfPresentationRef.current.classList.contains('section--active')) {
        sectionOfPresentationRef.current.classList.remove('section--active');
      }
    }
    else if (!sectionOfPresentationRef.current.classList.contains('section--active')) {
      sectionOfPresentationRef.current.classList.add('section--active');
    }
  };

  // Ici, comme le scrollYContext arrive avant que le composant Presentation soit chargé
  // Je le met donc dans un state local
  useEffect(() => {
    if (scrollYContext) {
      setScrollY(scrollYContext);
    }
  }, [scrollYContext]);

  // Comme ça, lorsque le state local sera défini, le composant sera chargé
  useEffect(() => {
    if (scrollY) {
      // Si headerRef est défini
      // ET si la largeur de la fenêtre est supérieur à 775
      if (headerRef && window.innerWidth > 775) {
        // Si currentUrl est égale à '/home#presentation' ou à '/home'
        if (currentUrl === '/home#presentation' || currentUrl === '/home') {
          onScroll();
        }
      }
    }
  }, [scrollY]);

  return (
    <section id="presentation" className="section" ref={sectionOfPresentationRef}>
      <div className="content">
        <div className="content__section">
          <div className="content__section__container">
            <img className="content__section__container__img" src="https://avatars.githubusercontent.com/u/88596531?v=4&s=350" alt="profile de Léo Chenot" />
          </div>
          <div className="content__section__content">
            <h3 className="content__section__content__name">Léo Chenot</h3>
            <h1 className="content__section__content__job">Développeur FullStack JS</h1>
          </div>
        </div>

        <div className="content__box content__box--first">
          <div className="content__box__header">
            <h4 className="content__box__header__title">Qui suis-je ?</h4>
          </div>
          <div className="content__box__main">
            <div className="content__box__main__part content__box__main__part--left">
              <img className="content__box__main__part__img" src={WhoIAm} alt="silhouette d'un homme" />
            </div>
            <div className="content__box__main__bar">
              <div className="content__box__main__bar__cursor" />
            </div>
            <div className="content__box__main__part content__box__main__part--right">
              <p className="content__box__main__part__text">
                Je m'appelle Léo, j'ai 18 ans.
                <br />
                <br />
                Je suis passionné par le développement ainsi que par la technologie, le cinéma, et le sport.
              </p>
            </div>
          </div>
        </div>

        <div className="content__box">
          <div className="content__box__header">
            <h4 className="content__box__header__title">Parcours</h4>
          </div>
          <div className="content__box__main">
            <div className="content__box__main__part content__box__main__part--left">
              <p className="content__box__main__part__text">
                Du 06 Décembre 2021 au 27 Mai 2022, j'ai suivi une formation de Développeur FullStack JS chez O'clock.
                {' '}
                (
                <a
                  className="content__box__main__part__text__link"
                  href="https://oclock.io/formations/developpeur-web-fullstack-javascript"
                  target="_blank"
                  rel="noreferrer"
                >
                  En savoir plus...
                </a>
                )
                <br />
                <br />
                J'ai ensuite passé le titre professionnel de Développeur Web et Web Mobile le 19 Août 2022 que j'ai obtenu récemment.
              </p>
            </div>
            <div className="content__box__main__bar">
              <div className="content__box__main__bar__cursor" />
            </div>
            <div className="content__box__main__part content__box__main__part--right">
              <img className="content__box__main__part__img" src={Parcours} alt="homme au sommet d'une petite montagne fixant une montagne encore plus haute" />
            </div>
          </div>
        </div>

        <div className="content__box content__box--last">
          <div className="content__box__header">
            <h4 className="content__box__header__title">Compétences</h4>
          </div>
          <div className="content__box__main">
            <div className="content__box__main__part content__box__main__part--left">
              <img className="content__box__main__part__img" src={Competences} alt="logo de chacune des technologies ou langages que je maîtrise : HTML, CSS, JavaScript, React, Redux, Sass, NodeJS, PostgreSQL, ExpressJS, Axios, Sequelize et JSON Web Token" />
            </div>
            <div className="content__box__main__bar">
              <div className="content__box__main__bar__cursor" />
            </div>
            <div className="content__box__main__part content__box__main__part--right">
              <p className="content__box__main__part__text">
                Je maîtrise les outils suivants :
                <br />
                <br />
                HTML, CSS et JavaScript pour le développement front-end, React, Redux et Sass pour la création d'interfaces utilisateur performantes et responsive.
                <br />
                <br />
                NodeJS et ExpressJS pour le développement back-end et la gestion de serveurs, ainsi que PostgreSQL pour la gestion de bases de données.
                <br />
                <br />
                Grâce à ces compétences, je suis en mesure de développer des applications web et mobile complètes, allant de la conception à la mise en production.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

Presentation.propTypes = {

};

export default Presentation;
