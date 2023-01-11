import React, { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

export const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
}

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
