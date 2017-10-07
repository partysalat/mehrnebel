import { describe, beforeEach, afterEach } from 'ava-spec';
import sinon from 'sinon';
import templateService from './../../../lib/server/services/templateService';
import indexHandler from '../../../lib/server/handlers/indexHandler';

describe('indexHandler.dutrinkst', (it) => {
  const ANY_EVENT = { stage: 'whatever' };
  const ANY_HTML = 'ANY_HTML';
  let callback;
  beforeEach(() => {
    sinon.stub(templateService, 'renderHtml').returns(ANY_HTML);
    callback = sinon.spy();
    indexHandler.login(ANY_EVENT, {}, callback);
  });

  afterEach(() => {
    templateService.renderHtml.restore();
  });

  it('calls templateService.renderHtml', (t) => {
    t.truthy(templateService.renderHtml.calledWith(ANY_EVENT));
  });

  it('calls callback with rendered HTML', (t) => {
    t.true(callback.calledWith(null, ANY_HTML), 'calls callback with rendered HTML');
  });
});

