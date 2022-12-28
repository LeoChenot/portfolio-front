import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setStateGlobal } from '../../actions/global';
import logo from '../../assets/logo.svg';

// import PropTypes from 'prop-types';
import './style.scss';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUrl } = useSelector((state) => state.globalReducer);

  const headerRef = useRef();
  const navRef = useRef();
  // Ref du state currentUrl, pour pouvoir y accéder dans la fonction de l'event listener onScroll
  const currentUrlStateRef = useRef(currentUrl);

  const getCurrentSection = (event) => {
    const { scrollY } = event.path[1];
    const scrollYWithHeader = scrollY + headerRef.current.offsetHeight;

    const homeElement = document.querySelector('.home');
    const sectionNodeList = homeElement.querySelectorAll('.section');

    const currentSectionId = [...sectionNodeList].find((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollYWithHeader >= sectionTop && scrollYWithHeader < sectionBottom) {
        return section;
      }

      return null;
    });

    return currentSectionId;
  };

  const onScroll = (event) => {
    const { scrollY } = event.path[1];

    // Je change la classe du header pour le rendre plus petit lorsqu'on scroll
    if (scrollY >= headerRef.current.offsetHeight) {
      if (!headerRef.current.classList.contains('header--sticky')) {
        headerRef.current.classList.add('header--sticky');
      }
    }
    else if (headerRef.current.classList.contains('header--sticky')) {
      headerRef.current.classList.remove('header--sticky');
    }

    // Je change l'url si scrollY est à l'intérieur d'une section
    const value = getCurrentSection(event);

    if (value) {
      if (currentUrlStateRef.current !== `/home#${value.id}`) {
        navigate(`/home#${value.id}`);
      }
    }
    else if (currentUrlStateRef.current !== '/home') {
      navigate('/home');
    }
  };

  const scrollToElementById = (id) => {
    // Si id est défini, je scroll jusqu'à l'élément correspondant
    if (id) {
      const element = document.querySelector(id);

      if (element) {
        const rect = element.getBoundingClientRect();

        window.scrollTo({
          top: window.scrollY + rect.y - headerRef.current.offsetHeight,
        });
      }
      else {
        console.log(`Aucune section du site ne comporte l\'id : ${id.slice(1, id.length)}`);
      }
    }
    // Sinon, je scroll en haut de la page
    else {
      window.scrollTo({
        top: 0,
      });
    }
  };

  useEffect(() => {
    // Lorsque le state currentUrl change...

    // Je met à jour la propriété currentUrlStateRef.current
    currentUrlStateRef.current = currentUrl;
  }, [currentUrl]);

  useEffect(() => {
    // Lorsque l'url change...

    // Je met à jour la classe isActive sur chaque item de la nav
    [...navRef.current.children].forEach((item) => {
      // Je selectionne le lien
      const linkElement = item.children[0];

      // Je récupère le hash à partir de l'url stockée dans l'attribut data-url
      let hash = linkElement.getAttribute('data-url').split('#')[1];
      // Si le hash est défini, on ajoute le caractère # devant, pour correspondre à location.hash
      // Sinon, on met une chaine de caractère vide, pour correspondre à location.hash
      hash = !hash ? hash = '' : `#${hash}`;

      // On enlève la classe isActive de tous les items
      if (linkElement.classList.contains('header__right__nav__list__item__link--isActive')) {
        linkElement.classList.remove('header__right__nav__list__item__link--isActive');
      }

      // Puis on ajoute la classe isActive à l'item correspondant à l'url en utilisant le hash
      if (location.hash === hash) {
        linkElement.classList.add('header__right__nav__list__item__link--isActive');
      }
    });

    // On met à jour le state currentUrl avec l'url actuelle
    dispatch(setStateGlobal('currentUrl', location.pathname + location.hash));
  }, [location]);

  useEffect(() => {
    // Au chargement de la page...

    // J'ajoute un event listener de type scroll
    window.addEventListener('scroll', onScroll);

    // Si l'url contient un hash, je scroll jusqu'à l'élément correspondant
    if (location.hash) {
      scrollToElementById(location.hash);
    }

    // Si scrollY est inférieur à la hauteur du header, je retire la classe header--sticky
    // Ce qui rend le header plus grand
    if (window.scrollY < headerRef.current.offsetHeight) {
      headerRef.current.classList.remove('header--sticky');
    }
  }, []);

  return (
    <header className="header header--sticky" ref={headerRef}>
      <div className="header__left">
        <Link className="header__left__logo" to="/home">
          <img className="header__left__logo__img" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header__right">
        <nav className="header__right__nav">
          <ul className="header__right__nav__list" ref={navRef}>
            <li className="header__right__nav__list__item">
              <button
                type="button"
                className="header__right__nav__list__item__link"
                data-url="/home"
                onClick={() => scrollToElementById()}
              >
                Accueil
              </button>
            </li>
            <li className="header__right__nav__list__item">
              <button
                type="button"
                className="header__right__nav__list__item__link"
                data-url="/home#presentation"
                onClick={() => scrollToElementById('#presentation')}
              >
                Présentation
              </button>
            </li>
            <li className="header__right__nav__list__item">
              <button
                type="button"
                className="header__right__nav__list__item__link"
                data-url="/home#projects"
                onClick={() => scrollToElementById('#projects')}
              >
                Mes projets
              </button>
            </li>
            <li className="header__right__nav__list__item">
              <button
                type="button"
                className="header__right__nav__list__item__link"
                data-url="/home#contact"
                onClick={() => scrollToElementById('#contact')}
              >
                Contact
              </button>
            </li>
            <li className="header__right__nav__list__item">
              <button
                type="button"
                className="header__right__nav__list__item__link"
                data-url="/home#test"
                onClick={() => scrollToElementById('#test')}
              >
                Test
              </button>
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
