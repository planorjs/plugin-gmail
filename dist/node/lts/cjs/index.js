'use strict';

var googleapis = require('googleapis');
var core = require('@planorjs/core');

class PlanorServiceGmail extends core.PlanorService {
  constructor(credentials, opts = {}) {
    super('gmail', 'email');
    this.credentialKeys = ['sender', 'gcloudProject', 'googleApplicationCredentials'];
    this.setCredentials(credentials);
    this.setOpts(opts);
  }

  async getClient() {
    const creds = super.getCredentials();
    process.env.GCLOUD_PROJECT = creds.gcloudProject;
    process.env.GOOGLE_APPLICATION_CREDENTIALS = creds.googleApplicationCredentials;
    this.client = await googleapis.google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/gmail.send']
    });
    this.client.subject = creds.sender;
    this.gmail = googleapis.google.gmail({
      version: 'v1',
      auth: this.client
    });
    return this.gmail;
  }

  async send(mimemsg) {
    var _resp$data;

    mimemsg.setSender(this.client.subject);
    const resp = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: mimemsg.asEncoded()
      }
    });

    if (!((_resp$data = resp.data) !== null && _resp$data !== void 0 && _resp$data.id)) {
      throw new Error(`Couldn't send the email`, {
        cause: resp.data
      });
    }

    return resp.data;
  }

}

module.exports = PlanorServiceGmail;
//# sourceMappingURL=index.js.map
