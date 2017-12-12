const jwt = require('jsonwebtoken');

module.exports = class JWTGenerator {
  constructor(payload) {
    this.payload = payload;
    this.expiry = 600;
  }

  doesTrustIdExist() {
    return !!this.payload.trustId;
  }

  doesEnterpriseIdExist() {
    return !!this.payload.enterpriseId;
  }

  doesAppIdExist() {
    return !!this.payload.appId;
  }

  isPayloadComplete() {
    if (
      !this.doesTrustIdExist() ||
      !this.doesAppIdExist() ||
      !this.doesEnterpriseIdExist()
    ) {
      throw new Error('Payload incomplete');
    }
  }

  signPayload(secretKey) {
    this.isPayloadComplete();
    return jwt.sign(this.payload, secretKey, { expiresIn: this.expiry });
  }

  generateJWT(secretKey) {
    const jsonWebToken = this.signPayload(secretKey);
    return { TRUST_ID: this.payload.trustId, APP_ID: this.payload.appId, JWT: jsonWebToken };
  }

  /* eslint-disable class-methods-use-this */
  verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
  }
  /* eslint-enable class-methods-use-this */

};
