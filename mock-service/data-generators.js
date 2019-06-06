const faker = require('faker');
const util = require('./mock-service-util');

function personContact(type, amount, locale) {
  faker.locale = locale || 'en_US';
  let contactObj = {
    contact: [],
    userId: faker.random
      .number({
        min: 400000000,
        max: 500000000
      })
      .toString(),
    resourceId:
      'https://www.costco.com:443/wcs/resources/store/{storeId}/person/@self/contact',
    resourceName: 'person'
  };
  while (amount > 0) {
    let firstName = faker.name.firstName();
    let addressId = util.getUniqueAddressId(contactObj.contact);
    let email = faker.internet.email();
    let countryCode = locale === 'en_US' ? 'US' : 'CA';
    contactObj.contact.push({
      lastName: faker.name.lastName(),
      primary: amount === 1 ? 'true' : 'false',
      phone1: faker.phone.phoneNumberFormat(0).replace(/-/gi, ''),
      addressLine: [
        faker.address.streetAddress(),
        amount % 2 === 0 ? faker.address.secondaryAddress() : '',
        ''
      ],
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      nickName: `${firstName}-${addressId}`,
      addressType: type,
      addressId: addressId,
      state: faker.address.stateAbbr(),
      email1: email,
      country: countryCode,
      attributes: [
        {
          value: 'dbd4120d-ca8f-4c3a-bc20-b7452979caae',
          key: 'addressField1'
        }
      ],
      firstName: firstName
    });
    if (type === 'Billing' && amount === 1) {
      // Add self address object
      contactObj.contact.push({
        primary: 'false',
        email1: email,
        attributes: [
          {
            value: 'dbd4120d-ca8f-4c3a-bc20-b7452979caae',
            key: 'addressField1'
          }
        ],
        nickName: `${countryCode}:${email}`,
        addressType: 'Billing',
        addressId: util.getUniqueAddressId(contactObj.contact)
      });
    }
    --amount;
  }
  return contactObj;
}

module.exports = {
  personContact: personContact
};
