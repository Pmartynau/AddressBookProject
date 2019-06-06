const fs = require('fs');
const util = require('./mock-service-util');
const path = require('path');
const writePath = path.join(__dirname, 'db.json');

let db = {};

db['person-contact-US'] = util.personContactSeed('en_US');
db['person-contact-CA'] = util.personContactSeed('en_CA');

fs.writeFile(writePath, JSON.stringify(db, null, 1), 'utf8', err => {
  if (err) throw err;
  console.log('db.json has been seeded with data');
});

/**
 * Example session expired response
 * {
   "errors": [{
     "errorParameters": "",
     "errorCode": "CWXFR0223E",
     "errorKey": "ERR_COOKIE_EXPIRED",
     "errorMessage": "CWXFR0223E: The user activity cookie is expired."
   }]
 }

 * Example of validation errors from server

 {
   "errorParameters": "",
   "errorCode": "ERR_ZIPCODE_NOTVALID",
   "errorKey": "ERR_ZIPCODE_NOTVALID",
   "errorMessage": "You have entered an invalid zip code. Please correct your entry to continue saving this address."
 }
 */
