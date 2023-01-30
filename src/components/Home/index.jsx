import React, {
  useEffect, useContext, useState, useRef,
} from 'react';
import { IoMdArrowUp } from 'react-icons/io';
import Contact from '../Contact';
import Presentation from '../Presentation';
import Projects from '../Projects';

import { ScrollContext } from '../ScrollProvider';

// import PropTypes from 'prop-types';
import './style.scss';

function Home() {
  const scrollYContext = useContext(ScrollContext);
  const [scrollY, setScrollY] = useState(undefined);

  const scrollToTopButtonRef = useRef();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    if (scrollY >= 56) {
      if (scrollToTopButtonRef.current.classList.contains('home__scrollTopButton__hidden')) {
        scrollToTopButtonRef.current.classList.remove('home__scrollTopButton__hidden');
      }
    }
    else if (!scrollToTopButtonRef.current.classList.contains('home__scrollTopButton__hidden')) {
      scrollToTopButtonRef.current.classList.add('home__scrollTopButton__hidden');
    }
  }, [scrollY]);

  // Ici, comme le scrollYContext arrive avant que le composant Home soit chargé
  // Je le met donc dans un state local
  useEffect(() => {
    if (scrollYContext) {
      setScrollY(scrollYContext);
    }
  }, [scrollYContext]);

  return (
    <div className="home">
      <Presentation />
      <Projects />
      <Contact />
      <button className="home__scrollTopButton home__scrollTopButton__hidden" ref={scrollToTopButtonRef} type="button" onClick={scrollToTop}>
        <IoMdArrowUp className="home__scrollTopButton__icon" />
      </button>
    </div>
  );
}

Home.propTypes = {

};

export default Home;
