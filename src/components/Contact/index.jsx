/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from 'react-icons/io';

// import PropTypes from 'prop-types';
import './style.scss';

function Contact() {
  const messageRef = useRef();

  const copyUsernameInClipboard = async (event) => {
    const socialElement = event.target.closest('.content__socials__social');
    const usernameElement = socialElement.querySelector('.content__socials__social__link__username');
    let messageError = '';

    // Je copie le username dans le presse-papier
    try {
      navigator.clipboard.writeText(usernameElement.textContent);
    } catch (error) {
      messageError = 'Utilisation de la méthode (deprecated) : document.execCommand(\'copy\')';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(usernameElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }

    messageRef.current.classList.add('content__socials__social__message--show');

    setTimeout(() => {
      messageRef.current.classList.remove('content__socials__social__message--show');
    }, 1500);

    if (messageError !== '') {
      throw new Error(messageError);
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="title">Contact</h2>
      <div className="content">
        <div className="content__socials">

          <div className="content__socials__social">
            <button className="content__socials__social__link" type="button" onClick={copyUsernameInClipboard}>
              <IoMdMail className="content__socials__social__link__icon content__socials__social__link__icon--email" />
              <span className="content__socials__social__link__username">leochenot1@gmail.com</span>
            </button>
            <div className="content__socials__social__message" ref={messageRef}>
              <div className="content__socials__social__message__content">
                <span className="content__socials__social__message__content__text">Copié !</span>
                <div className="content__socials__social__message__content__triangle" />
              </div>
            </div>
          </div>

          <div className="content__socials__social">
            <a className="content__socials__social__link" href="https://github.com/LeoChenot" target="_blank" rel="noreferrer">
              <IoLogoGithub className="content__socials__social__link__icon content__socials__social__link__icon--github" />
              <span className="content__socials__social__link__username">LeoChenot</span>
            </a>
          </div>

          <div className="content__socials__social">
            <a className="content__socials__social__link" href="https://www.linkedin.com/in/leo-chenot/" target="_blank" rel="noreferrer">
              <IoLogoLinkedin className="content__socials__social__link__icon content__socials__social__link__icon--linkedin" />
              <span className="content__socials__social__link__username">leo-chenot</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

Contact.propTypes = {

};

export default Contact;
