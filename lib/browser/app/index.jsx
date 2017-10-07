import React, { Component } from 'react';
import './index.styl';
import Card from './card/card';
import gamble from './gambling/gambleService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { title: 'Modifier', open: false, key: 'modifier' },
        { title: 'Basis', open: false, key: 'basis' },
        { title: 'Special', open: false, key: 'special' },
      ],
    };
  }
  reset() {
    this.setState((currentState) => {
      currentState.cards.forEach((card) => {
        card.open = false;// eslint-disable-line no-param-reassign
      });
      return currentState;
    });
  }
  enableCards() {
    this.setState((currentState) => {
      const closedCard = currentState.cards.find(card => !card.open);
      if (!closedCard) {
        return currentState;
      }
      closedCard.open = !closedCard.open;
      setTimeout(() => this.enableCards(), 1000, this);
      return currentState;
    });
  }
  gambleMode() {
    this.reset();
    const modes = gamble();
    this.setState((currentState) => {
      currentState.cards.forEach((card) => {
        card.modeText = modes[card.key].text;// eslint-disable-line no-param-reassign
        card.description = modes[card.key].description;// eslint-disable-line no-param-reassign
      });

      setTimeout(() => {
        this.enableCards();
      }, 1000);

      return currentState;
    });
  }
  showExplanation(title, msg) { // eslint-disable-line class-methods-use-this
    window.alert(`${title}: ${msg}`);// eslint-disable-line no-alert,no-undef,class-methods-use-this
  }
  render() {
    return (
      <div>
        <h1 className="app-headline">Der Einarmige Flunkimat!</h1>
        <button className="app-button" onClick={() => this.gambleMode()}>
          Gamble
        </button>

        {this.state.cards.map(config =>
          <div key={config.title} className="app-card">
            <Card
              title={config.title}
              isOpen={config.open}
              modeText={config.modeText}
              onClick={() => this.showExplanation(config.modeText, config.description)}
            />
          </div>
        )}

      </div>
    );
  }
}

export default App;
