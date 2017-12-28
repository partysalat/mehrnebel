import templateService from '../services/templateService';

function login(event, context, cb) {
  cb(null, templateService.renderHtml());
}

module.exports.login = login;
