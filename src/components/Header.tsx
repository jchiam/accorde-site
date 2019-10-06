import React from 'react';
import Scroll from 'react-scroll';

const SCROLL_OFFSET = -60;

const Header = () => {
  const renderHeaderButton = (anchor: string, label: string) => (
    <Scroll.Link
      className="header-button"
      activeClass="header-button-selected"
      to={anchor}
      offset={SCROLL_OFFSET}
      spy
      smooth
      isDynamic
    >
      {label}
    </Scroll.Link>
  );

  return (
    <div className="header-container">
      <div className="header">
        {renderHeaderButton('home', 'HOME')}
        {renderHeaderButton('about', 'ABOUT')}
        {renderHeaderButton('music', 'MUSIC')}
        {renderHeaderButton('gallery', 'GALLERY')}
        {renderHeaderButton('contact', 'CONTACT')}
      </div>
    </div>
  );
};

export default Header;
