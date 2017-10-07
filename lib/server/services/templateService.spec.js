import { describe, beforeEach, afterEach } from 'ava-spec';
import sinon from 'sinon';
import templateService from './../../../lib/server/services/templateService';
import config from './../../../lib/server/config';

describe('templateService.renderHtml', (it) => {
  const ANY_EVENT = 'ANY_EVENT';
  const ANY_ASSETS_BASE_URL = '/asset/baseurl';
  let result;

  beforeEach(() => {
    sinon.stub(config, 'getConfig').returns(ANY_ASSETS_BASE_URL);
    result = templateService.renderHtml(ANY_EVENT);
  });

  afterEach(() => {
    config.getConfig.restore();
  });

  it('returns gets the stage config', (t) => {
    t.truthy(config.getConfig.calledWith('/assets/baseUrl', ANY_EVENT));
  });

  it('contains the base url', (t) => {
    t.regex(result, new RegExp(ANY_ASSETS_BASE_URL), 'Contains assets base url');
  });
});
