import * as awsIot from 'aws-iot-device-sdk';
import { utf8ByteArrayToString } from 'utf8-string-bytes';
import getInstance from '../../../app/login/httpService';
import { eventChannel } from 'redux-saga';

const hiddenProperty = 'hidden' in document ? 'hidden' :
  'webkitHidden' in document ? 'webkitHidden' :
    'mozHidden' in document ? 'mozHidden' :
      null;

const visibilityStateProperty = 'visibilityState' in document ? 'visibilityState' :
  'webkitVisibilityState' in document ? 'webkitVisibilityState' :
    'mozVisibilityState' in document ? 'mozVisibilityState' :
      null;

export function createEventChannel(client) {
  return eventChannel((emitter) => {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

    const onVisibilityChange = (topic, message) => {
      emitter(!document[hiddenProperty]);
    };

    document.addEventListener(visibilityChangeEvent, onVisibilityChange);

    return () => {
      document.removeEventListener(onVisibilityChange);
    };
  });
}

