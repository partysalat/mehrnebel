import { beforeEach, describe } from 'ava-spec';
import templateService from './../../../lib/server/services/templateService';
import config from './../../../lib/server/config';

describe('templateService.renderHtml', (it) => {
  const ANY_EVENT = 'ANY_EVENT';
  let result;

  beforeEach(() => {
    result = templateService.renderHtml(ANY_EVENT);
  });

  it('contains the base url', (t) => {
    t.regex(result, new RegExp(config.assets.baseUrl), 'Contains assets base url');
  });
});
