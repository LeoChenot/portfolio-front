/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

import { IoIosWarning, IoLogoGithub } from 'react-icons/io';

// import PropTypes from 'prop-types';
import './style.scss';

function Projects() {
  const sectionOfProjects = useRef();

  const resetAllCards = (event) => {
    if (event.target.id === 'projects' || event.target.classList.contains('content') || event.target.classList.contains('content__projects')) {
      const flipCards = document.querySelectorAll('.content__projects__project');
      flipCards.forEach((flipCard) => {
        const flipCardInner = flipCard.querySelector('.content__projects__project__inner__content');
        flipCardInner.classList.remove('content__projects__project__inner__content--flipped');
      });
    }
  };

  const flipTheCard = (flipCard) => {
    const flipCardInner = flipCard.querySelector('.content__projects__project__inner__content');
    flipCardInner.classList.toggle('content__projects__project__inner__content--flipped');
  };

  useEffect(() => {
    // Au chargement de la page...

    // Je récupère toutes les flipCards
    const flipCards = document.querySelectorAll('.content__projects__project');

    // Et pour chacune d'entre elles...
    flipCards.forEach((flipCard) => {
      // Je récupère le bouton "En savoir plus..."
      const btn = flipCard.querySelector('.content__projects__project__inner__content__front__content__btn');

      // Et le bouton "Retour..."
      const btnBack = flipCard.querySelector('.content__projects__project__inner__content__back__content__btn');

      // Et je lui ajoute un écouteur d'évènement au clic qui retourne la carte
      btn.addEventListener('click', () => flipTheCard(flipCard));
      btnBack.addEventListener('click', () => flipTheCard(flipCard));
    });

    // J'ajoute un écouteur d'évènement au clic sur la section des projets
    // qui retourne toutes les cartes qui sont retournées
    sectionOfProjects.current.addEventListener('click', resetAllCards);
  }, []);

  return (
    <section id="projects" className="section" ref={sectionOfProjects}>
      <h2 className="title">Mes projets</h2>
      <div className="content">
        <div className="content__projects">
          <div className="content__projects__project">
            <div className="content__projects__project__inner">
              <div className="content__projects__project__inner__content" style={{ '--firstColor': '#2FB6C8', '--secondColor': '#2FB6C8' }}>
                <div className="content__projects__project__inner__content__front">
                  <div className="content__projects__project__inner__content__front__content">
                    <h3 className="content__projects__project__inner__content__front__content__name">Collectio</h3>
                    <img className="content__projects__project__inner__content__front__content__img" src="https://raw.githubusercontent.com/LeoChenot/LeoChenot/main/img/Collectio.png" alt="" />
                    <button className="content__projects__project__inner__content__front__content__btn" type="button">
                      En savoir plus...
                    </button>
                  </div>
                </div>
                <div className="content__projects__project__inner__content__back">
                  <div className="content__projects__project__inner__content__back__content">
                    <p className="content__projects__project__inner__content__back__content__description">
                      Collectio est le projet de fin d'étude que j'ai réalisé avec 3 camarades durant 1 mois.
                      <br />
                      <br />
                      Il s'agit d'une application web permettant de gérer une collection de divers médias tels que des livres, des films, des séries et des jeux vidéos.
                    </p>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--demo"
                          href="https://collectio-copy.netlify.app/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Démo en ligne
                        </a>
                        <div className="content__projects__project__inner__content__back__content__section__content__warning">
                          <IoIosWarning className="content__projects__project__inner__content__back__content__section__content__warning__icon" />
                        </div>
                        <div className="content__projects__project__inner__content__back__content__section__content__warning__message">
                          Avec l'arrêt des offres gratuites d'hébergement chez Heroku, la partie back-end du site ne fonctionne plus pour le moment...
                          (Création de compte, connexion utilisateur, etc.)
                        </div>
                      </div>
                    </div>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <p className="content__projects__project__inner__content__back__content__section__name">
                        Repositories Github :
                      </p>
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--github"
                          href="https://github.com/LeoChenot/projet-7-multitheque-front-copy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLogoGithub />
                          Front
                        </a>
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--github"
                          href="https://github.com/LeoChenot/projet-7-multitheque-back-copy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLogoGithub className="content__projects__project__inner__content__back__content__github__link__icon" />
                          Back
                        </a>
                      </div>
                    </div>
                    <button className="content__projects__project__inner__content__back__content__btn" type="button">
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content__projects__project">
            <div className="content__projects__project__inner">
              <div className="content__projects__project__inner__content" style={{ '--firstColor': '#008BAD', '--secondColor': '#008BAD' }}>
                <div className="content__projects__project__inner__content__front">
                  <div className="content__projects__project__inner__content__front__content">
                    <h3 className="content__projects__project__inner__content__front__content__name">Timers</h3>
                    <img className="content__projects__project__inner__content__front__content__img" src="https://raw.githubusercontent.com/LeoChenot/LeoChenot/main/img/Timers2.png" alt="" />
                    <button className="content__projects__project__inner__content__front__content__btn" type="button">
                      En savoir plus...
                    </button>
                  </div>
                </div>
                <div className="content__projects__project__inner__content__back">
                  <div className="content__projects__project__inner__content__back__content">
                    <p className="content__projects__project__inner__content__back__content__description">
                      Timers est un site permettant de créer des minuteurs, triés par liste.
                      <br />
                      <br />
                    </p>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--demo"
                          href="https://online-timers.netlify.app/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Démo en ligne
                        </a>
                        <div className="content__projects__project__inner__content__back__content__section__content__warning">
                          <IoIosWarning className="content__projects__project__inner__content__back__content__section__content__warning__icon" />
                        </div>
                        <div className="content__projects__project__inner__content__back__content__section__content__warning__message">
                          Avec l'arrêt des offres gratuites d'hébergement chez Heroku, la partie back-end du site ne fonctionne plus pour le moment...
                          (Création de compte, connexion utilisateur, etc.)
                        </div>
                      </div>
                    </div>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <p className="content__projects__project__inner__content__back__content__section__name">
                        Repositories Github :
                      </p>
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--github"
                          href="https://github.com/LeoChenot/timer-front"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLogoGithub />
                          Front
                        </a>
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--github"
                          href="https://github.com/LeoChenot/timer-back"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLogoGithub className="content__projects__project__inner__content__back__content__github__link__icon" />
                          Back
                        </a>
                      </div>
                    </div>
                    <button className="content__projects__project__inner__content__back__content__btn" type="button">
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content__projects__project">
            <div className="content__projects__project__inner">
              <div className="content__projects__project__inner__content" style={{ '--firstColor': '#FF7D1A', '--secondColor': '#FF7D1A' }}>
                <div className="content__projects__project__inner__content__front">
                  <div className="content__projects__project__inner__content__front__content">
                    <h3 className="content__projects__project__inner__content__front__content__name">Sneakers</h3>
                    <img className="content__projects__project__inner__content__front__content__img" src="https://cdn.discordapp.com/attachments/657342275210444828/1058016741961244772/integration-e-commerce.netlify.app_.png" alt="" />
                    <button className="content__projects__project__inner__content__front__content__btn" type="button">
                      En savoir plus...
                    </button>
                  </div>
                </div>
                <div className="content__projects__project__inner__content__back">
                  <div className="content__projects__project__inner__content__back__content">
                    <p className="content__projects__project__inner__content__back__content__description">
                      Sneakers est une intégration d'un site E-commerce trouvée sur le site
                      {' '}
                      <a
                        className="content__projects__project__inner__content__back__content__description__link"
                        href="https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6"
                        target="_blank"
                        rel="noreferrer"
                      >
                        FrontEnd Mentor
                      </a>
                      .
                    </p>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--demo"
                          href="https://integration-e-commerce.netlify.app/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Démo en ligne
                        </a>
                      </div>
                    </div>
                    <div className="content__projects__project__inner__content__back__content__section">
                      <p className="content__projects__project__inner__content__back__content__section__name">
                        Repository Github :
                      </p>
                      <div className="content__projects__project__inner__content__back__content__section__content">
                        <a
                          className="content__projects__project__inner__content__back__content__section__content__link content__projects__project__inner__content__back__content__section__content__link--github"
                          href="https://github.com/LeoChenot/integration-e-commerce-product-page"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLogoGithub />
                          Front
                        </a>
                      </div>
                    </div>
                    <button className="content__projects__project__inner__content__back__content__btn" type="button">
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Projects.propTypes = {

};

export default Projects;
