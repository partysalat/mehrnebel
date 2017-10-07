import modes from './modes.json';

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function gamble() {
  return {
    modifier: getRandomFromArray(modes.modifier),
    basis: getRandomFromArray(modes.basis),
    special: getRandomFromArray(modes.special),
  };
}


export default gamble;

