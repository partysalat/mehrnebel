import templateService from '../services/templateService';

function login(event, context, cb) {
  cb(null, templateService.renderHtml(event));
}

module.exports.login = login;
