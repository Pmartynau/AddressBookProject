const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join('src', 'mock-service', 'db.json'));
const middlewares = jsonServer.defaults();
const generators = require('./data-generators');
const util = require('./mock-service-util');
const dbPath = path.join(__dirname, 'db.json');
const dbWritePath = path.join(__dirname, 'db.json');
const fs = require('fs');
const yup = require('yup');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});
/**
 * person_contact
 *
 * This maps to the WebSphere Commerce REST API out-of-box GETter
 * https://www.ibm.com/support/knowledgecenter/en/SSZLC2_7.0.0/com.ibm.commerce.starterstores.doc/code/rsm_person_contact_fep8.htm
 *
 * Also reference the OOB methods that map to the OOB URLs for examples
 * https://www.ibm.com/support/knowledgecenter/en/SSZLC2_7.0.0/com.ibm.commerce.starterstores.doc/refs/rsm_PersonContactHandler.htm
 *
 * Maps to the OOB Rest Service
 */
server
  .route('/person-contact-:countryCode')
  /**
   * GET person-contact-;countryCode (pulls from ./db.json)
   */
  .get((req, res) => {
    const countryCode = req.params.countryCode;
    const addressType = (req.query.addressType || 'Shipping').toUpperCase();
    delete require.cache[require.resolve(dbPath)];
    let personContact = require(dbPath)[`person-contact-${countryCode}`];
    res.jsonp(
      addressType === 'SHIPPINGANDBILLING'
        ? personContact
        : util.filterByType(personContact, addressType)
    );
  })
  /**
   * POST person-contact-;countryCode (posts to ./db.json)
   * Content-Type: application/json
   * Request Body Example:
   * {
   *  "contact": [{
   *    "nickName": "Mary",
   *    "firstName": "Mary",
   *    "lastName": "Smith",
   *    "addressType": "Shipping",
   *    "zipCode": "98075",
   *    "addressLine": [
   *      "100 main st.",
   *      "Suite 100",
   *      ""
   *     ],
   *    "city": "RTP",
   *    "state": "North Carolina",
   *    "country": "US",
   *    "email1": "abc@xyz.com",
   *    "email2": "user1@abc.com",
   *    "phone1": "9191234567",
   *   }],
   *  "userId": "464794507",
   * }
   *
   * Curl Request Exmaple:
   * curl -XPOST -H "Content-type: application/json" -d '{
   *  "contact": [{
   *    "nickName": "Mary-2",
   *    "firstName": "Mary",
   *    "lastName": "Smith",
   *    "addressType": "Shipping",
   *    "zipCode": "98075",
   *    "addressLine": [
   *      "100 main st.",
   *      "Suite 100",
   *      ""
   *    ],
   *    "city": "RTP",
   *    "state": "North Carolina",
   *    "country": "US",
   *    "email1": "abc@xyz.com",
   *    "email2": "user1@abc.com",
   *    "phone1": "9191234567"
   *   }],
   *  "userId": "464794507"
   * }' 'http://localhost:3001/person-contact-:countryCode'
   *
   * Response Example:
   * {
   *  "userId": "464794507",
   *  "addressId": "335898504"
   * }
   */
  .post((req, res) => {
    const countryCode = req.params.countryCode;
    let schema = yup.object().shape({
      contact: yup.array().of(
        yup.object().shape({
          nickName: yup.string().required(),
          firstName: yup.string().required(),
          lastName: yup.string().required(),
          addressType: yup.string().required(),
          zipCode: yup.string().required(),
          addressLine: yup.array().of(yup.string()),
          city: yup.string().required(),
          state: yup.string().required(),
          country: yup.string().required(),
          email1: yup.string().required(),
          email2: yup.string(),
          phone1: yup.string().required()
        })
      ),
      userId: yup.string().required()
    });

    schema
      .validate(req.body)
      .then(function(reqBody) {
        // If we made it here, we're valid and ready to add to db.json
        delete require.cache[require.resolve(dbPath)];
        let db = require(dbPath);
        const userId = db[`person-contact-${countryCode}`].userId;
        let addressId = util.getUniqueAddressId(
          db[`person-contact-${countryCode}`].contact
        );
        req.body.addressId = addressId;
        db[`person-contact-${countryCode}`].contact.push(req.body.contact[0]);
        fs.writeFile(dbWritePath, JSON.stringify(db, null, 1), 'utf8', err => {
          res.jsonp({
            userId: userId,
            addressId: addressId
          });
        });
      })
      .catch(function(err) {
        res.jsonp({
          errors: err.errors.map(eMessage => {
            return {
              errorParameters: '',
              errorCode: err.name,
              errorKey: err.name,
              errorMessage: eMessage
            };
          })
        });
      });
  });
/**
 * GET /wcs/resources/store/:storeId/person/@self/contact
 *
 * Returns a random set of shipping or billing (or both types)
 * address based on storeId where 10301 = US and 10302 = CA.
 *
 * This maps to the WebSphere Commerce REST API out-of-box GETter
 * https://www.ibm.com/support/knowledgecenter/en/SSZLC2_7.0.0/com.ibm.commerce.starterstores.doc/code/rsm_person_contact_fep8.htm
 *
 * Example Usage:
 * http://localhost:3001/wcs/resources/store/{storeId}/person/@self/contact
 *
 * Optional Query Strings:
 *  addressType=Shipping|Billing
 *  amount=25
 */
server.get('/wcs/resources/store/:storeId/person/@self/contact', (req, res) => {
  const addressType = (req.query.addressType || 'Shipping').toUpperCase();
  const shippingAmount = req.query.amount
    ? parseInt(req.query.amount)
    : parseInt(Math.random() * (30 - 1) + 1);
  const billingAmount = req.query.amount
    ? parseInt(req.query.amount)
    : parseInt(Math.random() * (30 - 0) + 0);
  const locale = util.getLocale(req.params.storeId);
  const shippingPersonContacts = generators.personContact(
    'Shipping',
    shippingAmount,
    locale
  );
  const billingPersonContacts = generators.personContact(
    'Billing',
    billingAmount,
    locale
  );
  res.jsonp(
    addressType === 'SHIPPINGANDBILLING'
      ? util.mergePersonContacts(shippingPersonContacts, billingPersonContacts)
      : addressType === 'SHIPPING'
      ? shippingPersonContacts
      : billingPersonContacts
  );
});

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log('Mock Service Server Running on 3001');
});
