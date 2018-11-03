import { eventChannel } from 'redux-saga';

const hiddenProperty = ['hidden', 'webkitHidden', 'mozHidden']
  .find(property => property in document);

export function createEventChannel() {
  return eventChannel((emitter) => {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

    const onVisibilityChange = () => {
      emitter(!document[hiddenProperty]);
    };

    document.addEventListener(visibilityChangeEvent, onVisibilityChange);

    return () => {
      document.removeEventListener(onVisibilityChange);
    };
  });
}

