import React from 'react';
import PropTypes from 'prop-types';
import './card.styl';

function Card({ title, isOpen, modeText, onClick }) {
  return (
    <div className="card-container">
      <div className={['card', isOpen ? 'card-flipper' : ''].join(' ')}>
        <div className="card-front">
          {title}
        </div>
        <div className="card-back">
          <button className="card-button" onClick={() => onClick && onClick()}>
            {modeText}
          </button>
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modeText: PropTypes.string,
  onClick: PropTypes.func,
};
export default Card;
