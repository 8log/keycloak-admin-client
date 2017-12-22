'use strict';

const request = require('request');

module.exports = {
  find: find
};

function find (client) {
  return function find (realmName, options) {
    return new Promise(async (resolve, reject) => {
      options = options || {};
      const req = {
        auth: {
          bearer: await client.getToken()
        },
        json: true
      };

      req.url = `${client.baseUrl}/admin/realms/${realmName}/events`;
      req.qs = options;

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 200) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}
