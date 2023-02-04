/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { setStateGlobal } from '../../actions/global';
import logo from '../../assets/logo.svg';
import { ScrollContext } from '../ScrollProvider';

import './style.scss';

function Header() {
  const location = useLocation();
  const scrollYContext = useContext(ScrollContext);
  const [scrollY, setScrollY] = useState(0);
  const [destination, setDestination] = useState(undefined);

  // Pour avoir accès au state ScrollY dans mon useEffect(() => {}, [location])
  const scrollYRef = useRef();

  const dispatch = useDispatch();

  const { currentUrl, currentTitle } = useSelector((state) => state.globalReducer);

  const headerRef = useRef();
  const navRef = useRef();

  const getCurrentSectionByScrollY = () => {
    // Je défini la valeur de scrollY en ajoutant la hauteur du header
    const scrollYWithHeader = scrollY + headerRef.current.offsetHeight;

    // Je récupère la sectionList
    const sectionList = [...document.querySelectorAll('.section')];

    // Je déclare la currentSection sans valeur
    let currentSection;

    // Si nous somme en bas de la page...
    if (scrollY + window.innerHeight === document.documentElement.scrollHeight) {
      // Je défini la currentSection à la dernière section
      currentSection = sectionList[sectionList.length - 1];
    }
    // Sinon...
    else {
      currentSection = sectionList.find((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Si scrollYWithHeader se situe entre le le haut et le bas d'une section
        if (scrollYWithHeader >= sectionTop && scrollYWithHeader < sectionBottom) {
          // Je défini currentSection à cette section
          return section;
        }

        // Sinon je retourne rien
        return null;
      });
    }

    return currentSection;
  };

  const changeHeaderHeight = () => {
    // Si le scrollY est supérieur ou égale à la hauteur du header et qu'il ne possède pas la classe header--sticky...
    if (scrollY >= headerRef.current.offsetHeight) {
      if (!headerRef.current.classList.contains('header--sticky')) {
        // J'ajoute la classe header--sticky
        headerRef.current.classList.add('header--sticky');
      }
    }
    // Sinon..
    else if (headerRef.current.classList.contains('header--sticky')) {
      // J'enlève la classe header--sticky
      headerRef.current.classList.remove('header--sticky');
    }
  };

  const updateScrollYRef = () => {
    // Je met à jour le scrollYRef pour y avoir accès dans les useEffect
    scrollYRef.current = scrollY;
  };

  const updateWindowHistory = () => {
    const currentSectionByScrollY = getCurrentSectionByScrollY();
    let currentUrlTemp = window.location.pathname;
    if (currentUrlTemp === '/home') {
      if (currentSectionByScrollY) {
        if (currentUrl !== `/home#${currentSectionByScrollY.id}`) {
          window.history.pushState({}, '', `/home#${currentSectionByScrollY.id}`);
        }

        currentUrlTemp += `#${currentSectionByScrollY.id}`;
      }
      else if (currentUrl !== '/home') {
        window.history.pushState({}, '', '/home');
      }
    }
    return currentUrlTemp;
  };

  const updateActiveNavLink = (currentUrlTemp) => {
    if (currentUrlTemp) {
      const currentLink = document.querySelector(`.header__right__nav__list__item__link[href="${currentUrlTemp}"]`);

      const lastLink = document.querySelector('.header__right__nav__list__item__link--isActive');
      if (lastLink && lastLink.classList.contains('header__right__nav__list__item__link--isActive')) {
        lastLink.classList.remove('header__right__nav__list__item__link--isActive');
      }

      if (currentLink && !currentLink.classList.contains('header__right__nav__list__item__link--isActive')) {
        currentLink.classList.add('header__right__nav__list__item__link--isActive');
      }
    }
  };

  const changeTitle = () => {
    // Je vais cherche le currentTitle
    let title = document.querySelector('.header__right__nav__list__item__link--isActive')?.textContent;
    if (!title || title === 'Accueil') {
      title = 'Développeur Web passionné et toujours prêt à coder';
    }

    dispatch(setStateGlobal('currentTitle', title));
  };

  const updateURL = () => {
    const currentUrlTemp = updateWindowHistory();
    updateActiveNavLink(currentUrlTemp);
    changeTitle();
  };

  // Lorsque le scrollYContext change...
  useEffect(() => {
    // S'il est défini...
    if (scrollYContext) {
      // Je met à jour la state local scrolllY
      setScrollY(scrollYContext);
    }
  }, [scrollYContext]);

  // Lorsque location change...
  useEffect(() => {
    // Si le pathname est égale à '/home'...
    if (location.pathname === '/home') {
      // Petite marge d'erreur
      if (scrollYRef.current > 5) {
        window.scrollTo({
          top: scrollYRef.current,
          behavior: 'instant',
        });
      }
      if (location.hash !== '') {
        // Je récupère le destinationId
        const destinationId = location.hash.split('#')[1];

        // Si le destinationId est défini...
        if (destinationId) {
          // Je récupère la destinationSection
          const destinationSectionTemp = [...document.querySelectorAll('.section')].find((section) => {
            if (section.id === destinationId) {
              return section;
            }
            return null;
          });

          // Si la section à été trouvé...
          if (destinationSectionTemp) {
            const destinationSectionTempRect = destinationSectionTemp.getBoundingClientRect();
            window.scrollTo({
              top: scrollYRef.current - headerRef.current.offsetHeight + destinationSectionTempRect.top,
            });
          }
          else {
            // eslint-disable-next-line no-console
            console.error(`La section "${destinationId}" n'a pas été trouvée.`);
          }
          setDestination(destinationSectionTemp);
        }
      }
      // Sinon...
      else {
        // Cela veut dire que l'utilisateur veut retourner à l'accueil donc je le TP en haut de la page
        window.scrollTo({
          top: 0,
        });
      }
    }
    // Sinon...
    else {
      // On repart en haut de la page
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
    changeHeaderHeight();
    updateURL();
    dispatch(setStateGlobal('currentUrl', window.location.pathname + window.location.hash));
  }, [location]);

  // Lorsque je scroll...
  useEffect(() => {
    // Si scrollY est défini...
    if (scrollY) {
      if (window.location.pathname === '/home') {
        updateURL();
        dispatch(setStateGlobal('currentUrl', window.location.pathname + window.location.hash));
      }
      changeHeaderHeight();
      updateScrollYRef();
    }
  }, [scrollY]);

  useEffect(() => {
    // Je stock le headerRef dans un state
    dispatch(setStateGlobal('headerRef', headerRef));

    updateScrollYRef();
    changeHeaderHeight();
    updateURL();

    dispatch(setStateGlobal('currentUrl', window.location.pathname + window.location.hash));
  }, []);

  useEffect(() => {
    document.title = `Léo Chenot - ${currentTitle}`;
  }, [currentTitle]);

  return (
    <header className="header header--sticky" ref={headerRef}>
      <div className="header__left">
        <Link className="header__left__logo" to="/home">
          <img className="header__left__logo__img" src={logo} alt="le logo du portfolio de Léo Chenot" />
        </Link>
      </div>
      <div className="header__right">
        <nav className="header__right__nav">
          <ul className="header__right__nav__list" ref={navRef}>
            <li className="header__right__nav__list__item">
              <Link
                className="header__right__nav__list__item__link"
                to="/home"
              >
                Accueil
              </Link>
            </li>
            <li className="header__right__nav__list__item">
              <Link
                className="header__right__nav__list__item__link"
                to="/home#presentation"
              >
                Présentation
              </Link>
            </li>
            <li className="header__right__nav__list__item">
              <Link
                className="header__right__nav__list__item__link"
                to="/home#projects"
              >
                Mes projets
              </Link>
            </li>
            <li className="header__right__nav__list__item">
              <Link
                className="header__right__nav__list__item__link"
                to="/home#resume"
              >
                Mon CV
              </Link>
            </li>
            <li className="header__right__nav__list__item">
              <Link
                className="header__right__nav__list__item__link"
                to="/home#contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {

};

export default Header;
