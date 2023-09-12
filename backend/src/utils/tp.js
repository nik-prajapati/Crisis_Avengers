const jose = require('jose');
const fallbackSigningSecret =
  'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret =
  '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret =
  process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret);
const encryptionKey = Buffer.from(encryptionSecret);
const jwsAlg = 'HS512';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCMKW';
const tokenLifetime = '1d';

async function x() {
  const token = await new jose.SignJWT({ a: 1, b: 2, c: 3 })
    .setProtectedHeader({ alg: jwsAlg })
    .setExpirationTime(tokenLifetime)
    .sign(signingKey);
  console.log(token);
  const { payload, protectedHeader } = await jose.jwtVerify('eyJhbGciOiJIUzUxMiJ9.eyJhIjoxLCJiIjoyLCJjIjozLCJleHAiOjE2OTQ1NTA5NTd9.3ugAqG7sRJP60znvYDMQgO9u6PLT_l9Qen2MlBTU6clbPaONagEJTABCD3cXzLDMHPubioaEQfXewjyZ7fpq6w', signingKey);

  console.log(protectedHeader);
  console.log(payload);
}
x();
