import Confidence from 'confidence';
import config from './config';

const store = new Confidence.Store();

store.load(config);

function getConfig(path, event) {
  const stage = event.isOffline ? 'offline' : event.stage;
  return store.get(path, { stage });
}
export default { getConfig };
